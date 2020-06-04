import {useMutationWithDefaultParam} from "./useMutationWithDefaultParam";
import merge from 'lodash/merge';
import {CRUD_GET_MANY} from "react-admin";

export const useMutationGetMany = (query = {}, options = {}) => {
    const defaultOptions = {action: CRUD_GET_MANY};
    return useMutationWithDefaultParam(query, merge({},defaultOptions, options));
};
