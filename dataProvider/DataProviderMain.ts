import ReactAdminDocumentCache from "./ReactAdminDocumentCache";
import {CREATE, DELETE, GET_LIST, GET_MANY_REFERENCE, GET_ONE, UPDATE,} from 'react-admin';
import {DifferenceBetweenTwoObjects} from "util/DifferenceBetweenObjects";
import axios, {AxiosInstance} from "axios";
import {Schema} from "./Schema";
import {UserSession} from "./client/userSession";
import {objectToFormData} from 'object-to-formdata';
import {stringify} from 'qs';
import {isEmpty} from "lodash";
import {API_FOLDER, API_DOMAIN} from "../config";

interface apiResponse {
    api: any
}

interface getManyParams {
    ids: []
    [key: string]: any
    [key: number]: any
}

interface getOneParams {
    id: any
    [key: string]: any
    [key: number]: any
}

export class DataProviderMain {
    private static instance: DataProviderMain;
    private schema: Schema;
    public static entrypoint: string = API_DOMAIN;
    public static apiBase:string = API_FOLDER;
    private axios:AxiosInstance;

    private constructor(){
        this.schema = Schema.getInstance();
        this.axios = axios.create({
            baseURL: DataProviderMain.entrypoint,
            paramsSerializer: function (params) {
                return stringify(params, {
                    arrayFormat: 'brackets',
                    encoder: function (str, defaultEncoder, charset, type):any {
                        if (type === 'key') {
                            return  str.replace('__', '.');
                        }
                        return str;
                    }
                })
            },

        });
    }

    getIntrospect() {
        return this.schema.apiDocumentationParser(DataProviderMain.entrypoint + DataProviderMain.apiBase, this.fetchHeaders());
    }

    getMany (resource, params: getManyParams){
        return Promise.all(
            params.ids.map(id =>
                ReactAdminDocumentCache.has(id)
                    ? Promise.resolve({data: ReactAdminDocumentCache.get(id)})
                    : this.getOne(resource, {id}),
            ),
        ).then(responses => ({data: responses.map(({data}) => data)}));
    }

    getOne(resource, params: getOneParams) {
        return Promise.resolve({options: {}, url: this.getItemUrl(resource, params)})
            .then(httpOptions => this.fetchApi({...httpOptions, resource, params, type: GET_ONE}));
    }

    deleteMany(resource, params) {
        return Promise.all(
            params.ids.map(id => this.delete(resource, {id})),
        ).then(responses => ({data: []}));
    }

    delete(resource, params){
        return Promise.resolve({options: {
                                       method: 'DELETE',
            }, url: this.getItemUrl(resource, params),})
            .then(httpOptions => this.fetchApi({...httpOptions, resource, params, type: DELETE}));

    }

    getList (resource, params) {
        return this.getFilterResult(resource, params);
    }

    getManyReference(resource, params) {
        return this.getFilterResult(resource, params, GET_MANY_REFERENCE);
    }

    getFilterResult (resource, params, type = GET_LIST)  {
        const collectionUrl = this.getCollectionUrl(resource,params);
        const finalFilter: any = params.filter ?? {};

        if(params.pagination){
            const {pagination: {page, perPage}} = params;
            finalFilter.page = page;
            finalFilter.perPage = perPage;
        }
        if(params.sort){
            const {sort: {field, order}} = params;
            finalFilter.order = {[field]: order};
        }

        if (type === GET_MANY_REFERENCE && params.target) {
            finalFilter[params.target] = params.id;
            // collectionUrl.searchParams.set(params.target, params.id);
        }

        return Promise.resolve({
            options: {params: finalFilter},
            url: collectionUrl,
        }).then(httpOptions => this.fetchApi({...httpOptions, resource, params, type}));
    }

    update(resource, params) {
        const {data: {multipart, ...data}} = params;
        let params_to_patch = {};
        if(params.previousData){
            params_to_patch = DifferenceBetweenTwoObjects(data, params.previousData);
        }
        else params_to_patch = data;

        return this.schema.transformReactAdminDataToRequestBody(resource, params_to_patch).then(
            data => ({
                options: {
                    data: this.convertToMultipartParam(data, multipart),
                    method: 'PUT',
                },
                url: this.getItemUrl(resource,params),
            }),
        ).then(httpOptions => this.fetchApi({...httpOptions, resource, params, type: UPDATE}));
    }

    create (resource, params)  {
        const {data: {multipart, ...data}} = params;
        return this.schema.transformReactAdminDataToRequestBody(resource, data).then(
            data => {
                return {
                    options: {
                        data: this.convertToMultipartParam(data, multipart),
                        method: 'POST',
                    },
                    url: this.getCollectionUrl(resource,params),
                }
            }).then(httpOptions => this.fetchApi({...httpOptions, resource, params, type: CREATE}));
    }

    convertToMultipartParam (data, multipart: boolean)  {
        return multipart ? objectToFormData(data) : data;
    }

    getItemUrl(resource, params) {
        if(params.id && params.id['@id']) params.id = params.id['@id'];
        return params.url ? params.url :
            params.id.indexOf("/") > -1 ?  params.id :DataProviderMain.apiBase + resource + '/'  + params.id;
    };

    getCollectionUrl (resource, params) {
        return params && params.url ? params.url : DataProviderMain.apiBase + resource;
    };

    fetchApi ({url, options, resource, params, type}) {
        return this.httpClient(url, options)
            .then( response =>
            {
                return this.schema.convertHydraResponseToReactAdminResponse(type, resource, response, params)
            })
            .catch(error => {
                console.log(error);
                return Promise.reject(error.response);
                // return response.response.json().then(Promise.reject.bind(Promise));
            });
    };

    httpClient(url, options){
        const headers = this.fetchHeaders();
        const finalConfig = {url, headers: headers, ...options};
        return this.axios.request(finalConfig);
    }

    fetchHeaders () {
        const token = UserSession.getToken();
        const header: any = {};
        if(token) header.Authorization = `Bearer ${token}`;
        return header;
    };

    static getInstance(){
        return this.instance ?? (this.instance =  new this());
    }

    query (query) {
        const { type, resource, payload } = query;
        return this[type](resource, payload);
    }
}
