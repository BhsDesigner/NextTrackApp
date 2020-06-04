import {getCookie, removeCookie, setCookie} from "util/cookies";
import decodeJwt from "jwt-decode";

export class UserSession {

    private static instance:UserSession;

    public static USER_TOKEN_COOKIE = 'user-token'

    public static userCookieExpiration = 2592000000;
    public static cookieDomain = null;

    public isUserLoggedIn:boolean = false;

    private constructor(userCookieExpiration = 2592000000, cookieDomain = null) {
        UserSession.userCookieExpiration = userCookieExpiration;
        UserSession.cookieDomain = cookieDomain;
        this.isUserLoggedIn = !!UserSession.getToken();
    }

    public static getToken (req = null): string | null | undefined {
        return getCookie(UserSession.USER_TOKEN_COOKIE, req);
    }

    public static setToken(token, exp? : number){
        const params: any = {
            key: this.USER_TOKEN_COOKIE,
            value: token,
            expiration: exp || this.userCookieExpiration
        };

        if (this.cookieDomain) {
            params.domain = this.cookieDomain;
        }

        setCookie(params);
        this.getInstance().isUserLoggedIn = true;
    }

    public static removeToken(): void {
        const params: any = {};

        if (this.cookieDomain) {
            params.domain = this.cookieDomain;
        }
        window.localStorage.removeItem('role');
        removeCookie(this.USER_TOKEN_COOKIE, params);
        this.getInstance().isUserLoggedIn = false;
    }

    public static saveJwtToken(token){
        const decodedToken = decodeJwt(token);
        window.localStorage.setItem('role', decodedToken.roles);
        this.setToken(token, decodedToken.exp*1000);
        return decodedToken;
    }

    public static getRole(){
        return window.localStorage.getItem('role');
    }

    static getInstance(): UserSession {
        return this.instance ?? (this.instance =  new this());
    }
}
