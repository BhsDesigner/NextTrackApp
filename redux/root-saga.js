import { all, fork } from 'redux-saga/effects';
import {
  adminSaga,
} from 'react-admin';

const reactAdminSaga = function* rootSaga(dataProvider, authProvider) {
  yield all(
      [
        adminSaga(dataProvider, authProvider),

      ].map(fork)
  );
};

export default function* rootSaga(dataProvider, authProvider) {
  yield all([reactAdminSaga(dataProvider, authProvider)]);
}
