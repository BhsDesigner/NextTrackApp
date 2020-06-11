import {parse} from 'psl';

export default class HostnameProvider {
    public static hostname;

    public static hostnameProvider = (ctx = null) => {
        if(ctx && ctx.req) {
            HostnameProvider.hostname =  ctx.req.headers.host;
        }
        else {
            HostnameProvider.hostname =  window.location.host;
        }
        return HostnameProvider.hostname;
    }

    public static getDomain(){
        var parsed = parse(HostnameProvider.hostname);
        return parsed && parsed.domain ? parsed.domain: HostnameProvider.hostname;
    }
}
