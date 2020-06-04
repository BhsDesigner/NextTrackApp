import {DataProviderMain} from "./DataProviderMain";
import {API_DOMAIN, API_FOLDER} from "config";

DataProviderMain.apiBase = API_FOLDER;
export const dataProvider = DataProviderMain.getInstance(API_DOMAIN);
