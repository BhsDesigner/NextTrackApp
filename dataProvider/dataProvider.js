import {DataProviderMain} from "./DataProviderMain";
import {API_DOMAIN, API_FOLDER, LIVE} from "config";

DataProviderMain.apiBase = API_FOLDER;
export const dataProvider = (host) => {
    return DataProviderMain.getInstance(LIVE ? host: API_DOMAIN);
}
