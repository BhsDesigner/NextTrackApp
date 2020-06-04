import {User} from "dataProvider/client/user";
import {UserSession} from "../dataProvider/client/userSession";

export const authProvider = {
    login: params => {
        const res = new User().login(params);
        return res.then( res => {
            return UserSession.saveJwtToken(res.data.token);
            // Router.push('/');
        });
    },

    logout: params => {
        // console.log('called login');
        UserSession.removeToken();
        // Router.push('/login');
        return Promise.resolve();
    },
    checkAuth: params => {
        return UserSession.getToken() ? Promise.resolve() : Promise.reject();
    },
    checkError: params => {
        const status = params.status || params.code;
        if (401 === status || 403 === status) {
            UserSession.removeToken();
            // window.location.reload();
            return Promise.reject();
        }
        return Promise.resolve();
    },
    getPermissions: params => {
        var allowed = true;
        const role = UserSession.getRole();
        if(params === 'CAN_SCAN') allowed = role.split(',').includes("ROLE_TICKET_ALL");
        return allowed ? Promise.resolve(allowed) : Promise.reject();
    },
};
