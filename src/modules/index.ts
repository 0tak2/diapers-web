import { combineReducers } from 'redux';
import auth, { authSaga } from './auth';
import cnts, { cntsSaga } from './cnts';
import logs, { logsSaga } from './logs';
import { all } from 'redux-saga/effects';

const rootReducer = combineReducers({
    auth, cnts, logs
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;

export function* rootSaga() {
    yield all([authSaga(), cntsSaga(), logsSaga()]);
  }