import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './root-reducer';
import rootSaga from './root-saga';
import {routerMiddleware} from 'connected-react-router';

import {createBrowserHistory, createMemoryHistory} from 'history';

import {authProvider} from "../security/authProvider";
import {dataProvider} from "../dataProvider/dataProvider";
import {isServer} from "../util/isServer";
import decodeJwt from "jwt-decode";
import {UserSession} from "../dataProvider/client/userSession";

export const history = isServer
    ? createMemoryHistory({
        initialEntries: ['/']
    })
    : createBrowserHistory();

const initialDefaultState = { user: null};

const storePre =  (initialState = initialDefaultState) => {

    const token = UserSession.getToken();
    if(token){
        initialState.user = decodeJwt(token);
    }

    const reducer = rootReducer(history);

    // const resettableAppReducer = (state, action) =>
    //     reducer(action.type !== USER_LOGOUT ? state : undefined, action);

    const sagaMiddleware = createSagaMiddleware();

    const middlewares = [thunk, sagaMiddleware, routerMiddleware(history)];


    const bindMiddleware = middleware => {
        if (process.env.NODE_ENV !== 'production') {
            const { composeWithDevTools } = require('redux-devtools-extension');
            return composeWithDevTools(applyMiddleware(...middleware));
        }
        return applyMiddleware(...middleware);
    };

    const store = createStore(
        reducer,
        initialState,
        bindMiddleware(middlewares)
    );

    store.runSaga = () => {
        // Avoid running twice
        if (store.saga) return;
        store.saga = sagaMiddleware.run(rootSaga, dataProvider, authProvider);
    };

    store.stopSaga = async () => {
        // Avoid running twice
        if (!store.saga) return;
        store.dispatch(END);
        await store.saga.done;
        store.saga = null;
    };

    store.execSagaTasks = async (isServer, tasks) => {
        // run saga
        store.runSaga();
        // dispatch saga tasks
        tasks(store.dispatch);
        // Stop running and wait for the tasks to be done
        await store.stopSaga();
        // Re-run on client side
        if (!isServer) {
            store.runSaga();
        }
    };

    // Initial run
    store.runSaga();

    return store;
};

const makeStore = context => {
    return storePre();
};

export { makeStore };
