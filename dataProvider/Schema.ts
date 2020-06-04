import {ReactAdminDocument} from "./reactAdminDocument";
import {IdBasedReactAdminDocument} from "./idBasedReactAdminDocument";
import {SyliusReactAdminDocument} from "./syliusReactAdminDocument";
import ReactAdminDocumentCache from "./ReactAdminDocumentCache";
import {isPlainObject} from "lodash";
import {parseHydraDocumentation} from '@api-platform/api-doc-parser';

import {
    DELETE,
    // DELETE_MANY,
    GET_LIST,
    // GET_MANY,
    GET_MANY_REFERENCE,
} from 'react-admin';

const getFieldsAsObject = array => array.reduce((a,b)=> (a[b.name]=b, a),{});

interface resourceMapping {
    operations: any,
    fields: any,
    readableFields: any,
    writableFields: any,
}

export class Schema {
    public apiSchema: any;

    private static instance: Schema;

    public apiDocumentationParser (entrypoint, headers){
        if(this.apiSchema) return Promise.resolve({data: this.apiSchema});

        return parseHydraDocumentation(entrypoint, { headers: new Headers(headers),})
            .then(({ api }) => {
                this.setApiSchema(api);
                return {data: this.apiSchema};
            }, result => {
                return Promise.reject(result);
            });
    }

    public setApiSchema(apiSchema: any){
        this.apiSchema = apiSchema;
        this.addAdditionPropertiesToSchema();
    }

    addAdditionPropertiesToSchema(){
        const apiSchemaNew = {};
        if(this.apiSchema){
            this.apiSchema.resources.forEach(function(resourceSchema, index, array) {
                const resourceMapping: Partial<resourceMapping> = {};
                resourceMapping.operations = getFieldsAsObject(resourceSchema.operations);
                resourceMapping.fields = getFieldsAsObject(resourceSchema.fields);
                resourceMapping.readableFields = getFieldsAsObject(resourceSchema.readableFields);
                resourceMapping.writableFields = getFieldsAsObject(resourceSchema.writableFields);
                apiSchemaNew[resourceSchema.name] = {...resourceMapping};
                // apiSchema[resourceSchema.name].resourceMapping = resourceMapping;
                apiSchemaNew[resourceSchema.name].resourceSchema = resourceSchema;
            });
        }
        this.apiSchema.apiSchema = apiSchemaNew;
    }

    transformJsonLdDocumentToReactAdminDocument(
        document,
        clone = true,
        addToCache = true,
        request = null
    ) {
        if (clone) {
            // deep clone documents
            document = JSON.parse(JSON.stringify(document));
        }

        if(request && request.id === 'me') {
            document.id = request.id;
            document['@id'] = request.id;
        }

        // The main document is a JSON-LD document, convert it and store it in the cache
        if (document['@id'] && document['@id'].indexOf('/') > -1) {
            document = new ReactAdminDocument(document);
        }
        else if(document['id']){
            document = new IdBasedReactAdminDocument(document);
        }
        else if(document['code']){
            document = new SyliusReactAdminDocument(document);
        }

        // Replace embedded objects by their IRIs, and store the object itself in the cache to reuse without issuing new HTTP requests.
        Object.keys(document).forEach(key => {
            // to-one
            if (isPlainObject(document[key]) && document[key]['@id'] && document[key]['@id'].indexOf('/') > -1) {
                if (addToCache) {
                    let tempDocument = this.transformJsonLdDocumentToReactAdminDocument(
                        document[key],
                        false,
                        false,
                    );

                    ReactAdminDocumentCache.set(document[key]['@id'],tempDocument
                    );
                    document[key] = tempDocument;
                }
                // document[key] = document[key]['@id'];

                return;
            }

            // to-many
            if (
                Array.isArray(document[key]) &&
                document[key].length &&
                isPlainObject(document[key][0]) &&
                document[key][0]['@id'] && document[key][0]['@id'].indexOf('/') > -1
            ) {
                document[key] = document[key].map(obj => {
                    if (addToCache) {
                        let tempDocument = this.transformJsonLdDocumentToReactAdminDocument(obj, false, false);
                        ReactAdminDocumentCache.set(obj['@id'],tempDocument);
                        return tempDocument;
                    }
                    // return obj['@id'];
                    return obj;
                });
            }
        });

        return document;
    }

    transformReactAdminDataToRequestBody(resource, data = {}) {

        if(!this.apiSchema || !this.apiSchema.resources) return Promise.resolve(data);

        // resource = gomcoResource(resource);

        resource = this.apiSchema.resources.find(({name}) => resource === name);
        if (undefined === resource) {
            return Promise.resolve(data);
        }

        return this.convertReactAdminDataToHydraData(resource, data).then(data =>
            data,
        );
    }

    convertReactAdminDataToHydraData(resource, data = {}) {
        const fieldData = [];
        resource.writableFields.forEach(({name, reference, normalizeData}) => {
            if (!(name in data)) {
                return;
            }

            if (reference && data[name] === '') {
                data[name] = null;
                return;
            }

            if (undefined === normalizeData) {
                fieldData[name] = data[name];
                return;
            }

            fieldData[name] = normalizeData(data[name]);
        });

        const fieldDataKeys = Object.keys(fieldData);
        const fieldDataValues = Object.values(fieldData);

        return Promise.all(fieldDataValues).then(fieldData => {
            const object = {};
            for (let i = 0; i < fieldDataKeys.length; i++) {
                object[fieldDataKeys[i]] = fieldData[i];
            }

            return { ...object};
        });
    }

    convertHydraResponseToReactAdminResponse (
        type,
        resource,
        response,
        request
    ) {
        if(request.filter && request.filter.exportfile){
            return Promise.resolve(this.transformJsonLdDocumentToReactAdminDocument(response.data))
                .then(data => this.convertHydraDataToReactAdminData(resource, data)).then(data => ({
                    data: [data], total:  100
                }));

        }

        switch (type) {
            case GET_LIST:
            case GET_MANY_REFERENCE:
                let items;
                items = response.data.items;
                if(!items) items = response.data['hydra:member'];
                if(!items) items = response.data;
                // TODO: support other prefixes than "hydra:"
                return Promise.resolve(
                    items.map( data =>
                        this.transformJsonLdDocumentToReactAdminDocument(data),
                    ),
                )
                    .then(data =>
                        Promise.all(
                            data.map(data =>
                                this.convertHydraDataToReactAdminData(resource, data),
                            ),
                        ),
                    )
                    .then(data => {
                            var total = response.data['hydra:totalItems'];
                            var view = response.data['hydra:view'];
                            if(!total && view){
                                total = data.length;
                                var next = view['hydra:next'];
                                var current = view['@id'];
                                if(next) {
                                    total = Schema.calculateTotal(next);
                                }
                                else if(current){
                                    total = Schema.calculateTotal(current, total);
                                }
                            }
                            else if(response.data['totalItems']){
                                total = response.data['totalItems'];
                            }
                            else if(!total && !view){
                                total = data.length;
                            }
                            if(resource === 'searchs') {
                                const finalData: any = {data};
                                const finalTotal: any = {total};
                                if(response.data.buckets){
                                    const facets: any = {};
                                    facets.buckets = response.data.buckets;
                                    facets.taxons = response.data.taxons;
                                    facets.pricerange = [response.data.price_min, response.data.price_max];
                                    finalTotal.facets = facets;
                                }
                                // finalTotal.taxons = response.data.taxons;
                                finalData.total = finalTotal;
                                return finalData;
                            }
                            else return {data, total};
                        }
                    );

            case DELETE && Object.entries(response.data).length === 0 && response.data.constructor === Object:
                return Promise.resolve({data: {id: null}});

            default:
                return Promise.resolve(
                    this.transformJsonLdDocumentToReactAdminDocument(response.data, true, true, request),
                )
                    .then(data => this.convertHydraDataToReactAdminData(resource, data))
                    .then(data => ({data}));
        }
    }

    convertHydraDataToReactAdminData (resource, data = {}) {
        if(!data || !this.apiSchema || !this.apiSchema.resources) return Promise.resolve(data);

        resource = this.apiSchema.resources.find(({name}) => resource === name);
        if (undefined === resource) {
            return Promise.resolve(data);
        }

        const fieldData = {};
        resource.fields.forEach(({name, denormalizeData}) => {
            if (!(name in data) || undefined === denormalizeData) {
                return;
            }

            fieldData[name] = denormalizeData(data[name]);
        });

        const fieldDataKeys = Object.keys(fieldData);
        const fieldDataValues = Object.values(fieldData);

        return Promise.all(fieldDataValues).then(fieldData => {
            const object = {};
            for (let i = 0; i < fieldDataKeys.length; i++) {
                object[fieldDataKeys[i]] = fieldData[i];
            }

            return {...data, ...object};
        });
    }

    public static calculateTotal (url, minimum = null) {
        if(!url) return null;
        let perPage: any = new URLSearchParams(url).get("perPage");
        let page: any = new URLSearchParams(url).get("page");
        let total: any = perPage * page;
        if(minimum !== null && page === 1 && minimum < total) return minimum;
        return  total;
    };

    static getInstance(){
        return this.instance ?? (this.instance =  new this());
    }

}
