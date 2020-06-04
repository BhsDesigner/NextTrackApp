import cartActions from "../redux/cart/actions";
import {useMutationWithDefaultParam} from "./useMutationWithDefaultParam";
import merge from 'lodash/merge';

export const useMutationCart = (query = {}, options = {}) => {
    const defaultOptions = {action: cartActions.CART_UPDATED};
    return useMutationWithDefaultParam(query, merge({},defaultOptions, options));
};
