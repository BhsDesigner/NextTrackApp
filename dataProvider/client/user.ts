import {BaseClient} from "./baseClient";

export class User extends BaseClient {
    public resource = 'users';

    login (params){
        return this.create({data: params}, 'login_check');
    }

    me(){
        return this.getOne({id: "me"});
    }

    meQuery(){
        return this.getOneQuery({id: "me"});
    }
}
