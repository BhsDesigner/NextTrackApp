import { transform, isEqual, isObject,isArray } from 'lodash';

/**
 * Deep diff between two object, using lodash
 * @param  {Object} object Object compared
 * @param  {Object} base   Object to compare with
 * @return {Object}        Return a new object who represent the diff
 */
export const DifferenceBetweenTwoObjects = (object, base) => {
    return transform(object, (result, value, key) => {
        if(key === 'id') result[key] = value;
        else if (!isEqual(value, base[key])) {
            result[key] = isObject(value) && isObject(base[key]) && !isArray(value) && !isArray(base[key])  ? DifferenceBetweenTwoObjects(value, base[key]) : value;
        }
    });
};
