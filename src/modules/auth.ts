import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';

const LOGIN = 'auth/LOGIN' as const;
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS' as const;
const LOGIN_FAILED = 'auth/LOGIN_FAILED' as const;

const LOGOUT = 'auth/LOGOUT' as const;
const LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS' as const;
const LOGOUT_FAILED = 'auth/LOGOUT_FAILED' as const;

type LoginPayload = {
    username: string;
    password: string;
}

export const login = (payload: LoginPayload) => ({ type: LOGIN, payload });
export const loginSuccess = (payload: string) => ({ type: LOGIN_SUCCESS , payload });
export const loginFailed = (payload: string) => ({ type: LOGIN_FAILED, payload });
export const logout = () => ({ type: LOGOUT });
export const logoutSuccess = (payload: string) => ({ type: LOGOUT_SUCCESS , payload });
export const logoutFailed = (payload: string) => ({ type: LOGOUT_FAILED, payload });

type AuthAction =
    | ReturnType<typeof login>
    | ReturnType<typeof loginSuccess>
    | ReturnType<typeof loginFailed>
    | ReturnType<typeof logout>
    | ReturnType<typeof logoutSuccess>
    | ReturnType<typeof logoutFailed>;

function* loginSaga(action: ReturnType<typeof login>) {
    try {
        const response: string = yield call(axios.post, "/api/auth/loginc", action.payload, { withCredentials: true })
        yield put(loginSuccess(response))
    } catch (e) {
        yield put(loginFailed(e))
    }
}

function* logoutSaga() {
    try {
        const response: string = yield call(axios.post, "/api/auth/logoutc", "", { withCredentials: true })
        yield put(loginSuccess(response))
    } catch (e) {
        yield put(loginFailed(e))
    }
}

export function* authSaga() {
    yield takeEvery(LOGIN, loginSaga);
    yield takeEvery(LOGOUT, logoutSaga);
}

type AuthState = {
    username: string;
    isLoading: boolean;
    isLogin: boolean;
    isError: boolean;
    message: string;
};

const initialState: AuthState = {
    username: "",
    isLoading: false,
    isLogin: false,
    isError: false,
    message: ""
};

function auth( state: AuthState = initialState, action: AuthAction ): AuthState {
    switch (action.type) {
        case LOGIN:
            return { ...state, isLoading: true };
        case LOGIN_SUCCESS:
            return {...state, isLoading: false, username: action.payload, message: action.payload};
        case LOGIN_FAILED:
            return {...state, isLoading: false, isError: true, message: action.payload};
        case LOGOUT:
            return { ...state, isLoading: true };
        case LOGIN_SUCCESS:
            return {...state, isLoading: false, username: "", message: action.payload};
        case LOGIN_FAILED:
            return {...state, isLoading: false, isError: true, message: action.payload};
        default:
            return state;
    }
}

export default auth;