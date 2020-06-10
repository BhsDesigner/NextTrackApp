import {getTime} from "util/time";
import {dataProvider} from "dataProvider/dataProvider";
import {DataProviderMain} from "dataProvider/DataProviderMain";

export class BaseClient {

    private channel:string = "default";
    private locale:string = "en_US";
    private cartCookieExpiration:number = getTime(1500);
    public static cartTokenCookie = "cartToken";
    protected resource:string;

    protected multipart:boolean = false;

    protected dataProvider: DataProviderMain = dataProvider();
    private static instance;

    public getList(params, resource = null){
        return this.dataProvider.getList(resource ?? this.resource, params);
    }

    public getListQuery(params, resource = null){
        return this.createQuery('getList', params, resource);
    }

    public getOne(params, resource = null){
        return this.dataProvider.getOne(resource ?? this.resource, params);
    }

    public getOneQuery(params, resource = null){
        return this.createQuery('getOne', params, resource);
    }

    public update(params, resource = null){
        return this.dataProvider.update(resource ?? this.resource, {multipart: this.multipart, ...params});
    }

    public getUpdateQuery(params, resource = null){
        return this.createQuery('update', params, resource);
    }

    public create(params, resource = null){
        return this.dataProvider.create(resource ?? this.resource, {multipart: this.multipart, ...params});
    }

    public getCreateQuery(params, resource = null){
        return this.createQuery('create', params, resource);
    }

    public delete(params, resource = null){
        return this.dataProvider.delete(resource ?? this.resource, params);
    }

    public getDeleteQuery(params, resource = null){
        return this.createQuery('delete', params, resource);
    }

    public createQuery(type, params, resource = null ){
        return {
            type: type,
            resource: resource ?? this.resource,
            payload: params
        };
    }

    query (query) {
        const { type, resource, payload } = query;
        return this[type](resource, payload);
    }

    static getInstance() {
        return this.instance ?? (this.instance =  new this());
    }
}
