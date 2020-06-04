import actions from "redux/user/actions";
import {useMutationWithDefaultParam} from "./useMutationWithDefaultParam";
import merge from 'lodash/merge';

export const useMutationUser = (query = {}, options = {}) => {
    const defaultOptions = {action: actions.USER_UPDATED};
    return useMutationWithDefaultParam(query, merge({},defaultOptions, options));
};
