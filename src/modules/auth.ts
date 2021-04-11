import { call, put, takeEvery, getContext } from 'redux-saga/effects';
import { loginApi, logoutApi, LoginPayload, LoginResponse, LogoutResponse, UserData, getUserdataApi } from '../api/auth';
import { History } from 'history';
import { saveAccountInfo, delAccountInfo, getAccountInfo } from '../utils/accountInfoUtil';

const LOGIN_REQUEST = 'auth/LOGIN_REQUEST' as const;
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS' as const;
const LOGIN_FAILED = 'auth/LOGIN_FAILED' as const;

const LOGOUT_REQUEST = 'auth/LOGOUT_REQUEST' as const;
const LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS' as const;
const LOGOUT_FAILED = 'auth/LOGOUT_FAILED' as const;

const REDIRECT_HOME = 'auth/REDIRECT_HOME' as const;

const GET_USERDATA_BY_COOKIE_REQUEST = 'auth/GET_USERDATA_BY_COOKIE_REQUEST' as const;
const GET_USERDATA_BY_COOKIE_SUCCESS = 'auth/GET_USERDATA_BY_COOKIE_SUCCESS' as const;
const GET_USERDATA_BY_COOKIE_FAILED = 'auth/GET_USERDATA_BY_COOKIE_FAILED' as const;

export const loginRequest = (payload: LoginPayload) => ({ type: LOGIN_REQUEST, payload });
export const loginSuccess = (payload: LoginResponse) => ({ type: LOGIN_SUCCESS , payload });
export const loginFailed = (payload: any) => ({ type: LOGIN_FAILED, payload });
export const logoutRequest = () => ({ type: LOGOUT_REQUEST });
export const logoutSuccess = (payload: LogoutResponse) => ({ type: LOGOUT_SUCCESS , payload });
export const logoutFailed = (payload: any) => ({ type: LOGOUT_FAILED, payload });
export const redirectHome = () => ({ type: REDIRECT_HOME });
export const getUserdataRequest = () => ({ type: GET_USERDATA_BY_COOKIE_REQUEST });
export const getUserdataSuccess = (payload: LoginResponse) => ({ type: GET_USERDATA_BY_COOKIE_SUCCESS, payload });
export const getUserdataFailed = (payload: any) => ({ type: GET_USERDATA_BY_COOKIE_FAILED, payload });

type AuthAction =
    | ReturnType<typeof loginRequest>
    | ReturnType<typeof loginSuccess>
    | ReturnType<typeof loginFailed>
    | ReturnType<typeof logoutRequest>
    | ReturnType<typeof logoutSuccess>
    | ReturnType<typeof logoutFailed>
    | ReturnType<typeof redirectHome>
    | ReturnType<typeof getUserdataRequest>
    | ReturnType<typeof getUserdataSuccess>
    | ReturnType<typeof getUserdataFailed>;

function* loginSaga(action: ReturnType<typeof loginRequest>) {
    try {
        const response: LoginResponse = yield call(loginApi, action.payload);
        yield put(loginSuccess(response));
    } catch (e) {
        yield put(loginFailed(e));
    }
}

function* logoutSaga() {
    try {
        const response: LogoutResponse = yield call(logoutApi);
        yield put(logoutSuccess(response));
    } catch (e) {
        yield put(logoutFailed(e));
    }
}

function* loginSuccessSaga() {
    yield put(redirectHome());
}

function* logoutSuccessSaga() {
   yield put(redirectHome());
}

function* redirectHomeSaga() {
    const history: History = yield getContext('history');
    history.goBack();
}

function* redirectLoginSaga() {
    const history: History = yield getContext('history');
    history.push('/login/auto-login-failed');
}

function* getUserdataSaga() {
    try {
        const response: LoginResponse = yield call(getUserdataApi);
        yield put(getUserdataSuccess(response));
    } catch (e) {
        yield put(getUserdataFailed(e));
    }
}

export function* authSaga() {
    yield takeEvery(LOGIN_REQUEST, loginSaga);
    yield takeEvery(LOGOUT_REQUEST, logoutSaga);
    yield takeEvery(LOGIN_SUCCESS, loginSuccessSaga);
    yield takeEvery(LOGOUT_SUCCESS, logoutSuccessSaga);
    yield takeEvery(REDIRECT_HOME, redirectHomeSaga);
    yield takeEvery(GET_USERDATA_BY_COOKIE_REQUEST, getUserdataSaga);
    yield takeEvery(GET_USERDATA_BY_COOKIE_FAILED, redirectLoginSaga);
}

type AuthState = {
    username: string;
    userdata: UserData | null;
    loading: boolean;
    isLogin: boolean;
    error: any | null;
};

const initialState: AuthState = {
    username: "",
    userdata: null,
    loading: false,
    isLogin: false,
    error: null
};

function auth( state: AuthState = initialState, action: AuthAction ): AuthState {
    switch (action.type) {
        case LOGIN_REQUEST:
        case GET_USERDATA_BY_COOKIE_REQUEST:
            return { ...state, loading: true };
        case LOGIN_SUCCESS:
            saveAccountInfo(action.payload.username, action.payload.user_data);
            return {...state, loading: false, isLogin: true, username: action.payload.username, userdata: action.payload.user_data , error: null};
        case GET_USERDATA_BY_COOKIE_SUCCESS:
            const { username, user_data } = action.payload;
            const savedAccountInfo = getAccountInfo();
            if (username === savedAccountInfo.username) {
                if (user_data.description === savedAccountInfo.userdata.description
                    && user_data.realname === savedAccountInfo.userdata.realname
                    && user_data.level === savedAccountInfo.userdata.level) {
                        return {...state, loading: false, isLogin: true, username: username, userdata: user_data , error: null};
                    }
            }
            return {...state, loading: false, isLogin: false, error: true};
        case LOGIN_FAILED:
        case GET_USERDATA_BY_COOKIE_FAILED:
            return {...state, loading: false, error: action.payload};
        case LOGOUT_REQUEST:
            return { ...state, loading: true };
        case LOGOUT_SUCCESS:
            delAccountInfo();
            return {...state, loading: false, isLogin: false,  username: "", userdata: null, error: null};
        case LOGOUT_FAILED:
            return {...state, loading: false, error: action.payload};
        default:
            return state;
    }
}

export default auth;