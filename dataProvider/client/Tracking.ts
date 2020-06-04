import {BaseClient} from "./baseClient";

export class Tracking extends BaseClient{
    public resource:string = 'trackings';

    public trackOrder(params){
        return this.getList(params, 'trackorder');
    }

    public trackOrderQuery(params){
        return this.getListQuery(params, 'trackorder');
    }
}
