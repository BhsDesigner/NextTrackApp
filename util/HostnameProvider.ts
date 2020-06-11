export const hostnameProvider = (ctx = null) => {
    if(ctx.req) {
        return  ctx.req.headers.host;
    }
    else {
        return  window.location.hostname;
    }
}
