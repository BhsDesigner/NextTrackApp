import {useMutationWithDefaultParam} from "./useMutationWithDefaultParam";
import merge from 'lodash/merge';
import {CRUD_GET_LIST} from "react-admin";

export const useMutationGetList = (query = {}, options = {}) => {
    const defaultOptions = {action: CRUD_GET_LIST};
    return useMutationWithDefaultParam(query, merge({},defaultOptions, options));
};
