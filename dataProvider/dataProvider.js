import {DataProviderMain} from "./DataProviderMain";
import {LIVE} from "config";
import HostnameProvider from "../util/HostnameProvider";

export const dataProvider = () => {
    if(HostnameProvider.hostname && LIVE) DataProviderMain.entrypoint = '//api' + HostnameProvider.hostname;
    return DataProviderMain.getInstance();
}
