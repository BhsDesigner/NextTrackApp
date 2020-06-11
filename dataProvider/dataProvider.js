import {DataProviderMain} from "./DataProviderMain";
import {LIVE} from "config";

export const dataProvider = (host = null) => {
    if(host && LIVE) DataProviderMain.entrypoint = '//api' + host;
    return DataProviderMain.getInstance();
}
