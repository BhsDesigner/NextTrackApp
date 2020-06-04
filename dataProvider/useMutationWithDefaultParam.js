import {useMutation} from "react-admin";
import merge from 'lodash/merge';
import Router from 'next/router';
import {useShowErrorNotification} from "../components/Common/ShowNotification";

export const useMutationWithDefaultParam = (query = {}, options = {}) => {
    const notify = useShowErrorNotification();
    const defaultOptions = ({redirect,actions}) => {
        return {
            undoable: false,
            // action: CRUD_UPDATE,
            onSuccess: response => {
                // console.log(response);
                if(redirect) Router.push(redirect);

                if(actions) {
                    actions.resetForm();
                    actions.setSubmitting(false);
                }
                // showSuccessNotification(response.data);
            },
            onFailure: error => {
                // console.log(error);
                notify(error.data);
                if(actions) {
                    actions.resetForm();
                    actions.setSubmitting(false);
                }
                // showErrorNotification(error);
            }
        }
    };
    const [nativeMutate, {data, error, loading, loaded }] = useMutation(query,options);
    const mutate = (query,options = {}) => {
        nativeMutate(query, merge({},defaultOptions(options), options));
    };
    return [mutate, {data, error, loading, loaded }];
};
