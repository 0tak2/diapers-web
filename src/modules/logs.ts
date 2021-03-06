import { call, put, takeEvery } from 'redux-saga/effects';
import { LogType, BaseLogPayload, BaseLogResponse, 
                GetLogResponse, GetLogsPayload, GetLogsForPeriodPayload,
                GetLogsResponse, PostLogPayload, PatchLogPayload,
                getLogsApi, getLogsForPeriodApi, getLogApi,
                postLogApi, delLogApi, patchLogApi, getAllLogsForPeriodOneperdayApi,
                GetAllLogsForPeriodPayload, getAllLogsForPeriodApi } from '../api/logs';

const GET_LOGS_REQUEST = 'logs/GET_LOGS_REQUEST' as const;
const GET_LOGS_SUCCESS = 'logs/GET_LOGS_SUCCESS' as const;
const GET_LOGS_FAILED = 'logs/GET_LOGS_FAILED' as const;

const GET_LOGS_FOR_A_PERIOD_REQUEST = 'logs/GET_LOGS_FOR_A_PERIOD_REQUEST' as const;
const GET_LOGS_FOR_A_PERIOD_SUCCESS = 'logs/GET_LOGS_FOR_A_PERIOD_SUCCESS' as const;
const GET_LOGS_FOR_A_PERIOD_FAILED = 'logs/GET_LOGS_FOR_A_PERIOD_FAILED' as const;

const GET_ALL_LOGS_FOR_A_PERIOD_REQUEST = 'logs/GET_ALL_LOGS_FOR_A_PERIOD_REQUEST' as const;
const GET_ALL_LOGS_FOR_A_PERIOD_SUCCESS = 'logs/GET_ALL_LOGS_FOR_A_PERIOD_SUCCESS' as const;
const GET_ALL_LOGS_FOR_A_PERIOD_FAILED = 'logs/GET_ALL_LOGS_FOR_A_PERIOD_FAILED' as const;

const GET_ALL_LOGS_FOR_A_PERIOD_ONEPERDAY_REQUEST = 'logs/GET_ALL_LOGS_FOR_A_PERIOD_ONEPERDAY_REQUEST' as const;
const GET_ALL_LOGS_FOR_A_PERIOD_ONEPERDAY_SUCCESS = 'logs/GET_ALL_LOGS_FOR_A_PERIOD_ONEPERDAY_SUCCESS' as const;
const GET_ALL_LOGS_FOR_A_PERIOD_ONEPERDAY_FAILED = 'logs/GET_ALL_LOGS_FOR_A_PERIOD_ONEPERDAY_FAILED' as const;

const GET_LOG_REQUEST = 'logs/GET_LOG_REQUEST' as const;
const GET_LOG_SUCCESS = 'logs/GET_LOG_SUCCESS' as const;
const GET_LOG_FAILED = 'logs/GET_LOG_FAILED' as const;

const POST_LOG_REQUEST = 'logs/POST_LOG_REQUEST' as const;
const POST_LOG_SUCCESS = 'logs/POST_LOG_SUCCESS' as const;
const POST_LOG_FAILED = 'logs/POST_LOG_FAILED' as const;

const DEL_LOG_REQUEST = 'logs/DEL_LOG_REQUEST' as const;
const DEL_LOG_SUCCESS = 'logs/DEL_LOG_SUCCESS' as const;
const DEL_LOG_FAILED = 'logs/DEL_LOG_FAILED' as const;

const PATCH_LOG_REQUEST = 'logs/PATCH_LOG_REQUEST' as const;
const PATCH_LOG_SUCCESS = 'logs/PATCH_LOG_SUCCESS' as const;
const PATCH_LOG_FAILED = 'logs/PATCH_LOG_FAILED' as const;

export const getLogsRequest = (payload: GetLogsPayload) => ({ type: GET_LOGS_REQUEST , payload });
export const getLogsSuccess = (payload: GetLogsResponse) => ({ type: GET_LOGS_SUCCESS , payload });
export const getLogsFailed = (payload: any) => ({ type: GET_LOGS_FAILED, payload });
//
export const getLogsForPeriodRequest = (payload: GetLogsForPeriodPayload) => ({ type: GET_LOGS_FOR_A_PERIOD_REQUEST, payload });
export const getLogsForPeriodSuccess = (payload: GetLogsResponse) => ({ type: GET_LOGS_FOR_A_PERIOD_SUCCESS , payload });
export const getLogsForPeriodFailed = (payload: any) => ({ type: GET_LOGS_FOR_A_PERIOD_FAILED, payload });
//
export const getAllLogsForPeriodRequest = (payload: GetAllLogsForPeriodPayload) => ({ type: GET_ALL_LOGS_FOR_A_PERIOD_REQUEST, payload });
export const getAllLogsForPeriodSuccess = (payload: GetLogsResponse) => ({ type: GET_ALL_LOGS_FOR_A_PERIOD_SUCCESS , payload });
export const getAllLogsForPeriodFailed = (payload: any) => ({ type: GET_ALL_LOGS_FOR_A_PERIOD_FAILED, payload });
//
export const getAllLogsForPeriodOneperdayRequest = (payload: GetAllLogsForPeriodPayload) => ({ type: GET_ALL_LOGS_FOR_A_PERIOD_ONEPERDAY_REQUEST, payload });
export const getAllLogsForPeriodOneperdaySuccess = (payload: GetLogsResponse) => ({ type: GET_ALL_LOGS_FOR_A_PERIOD_ONEPERDAY_SUCCESS , payload });
export const getAllLogsForPeriodOneperdayFailed = (payload: any) => ({ type: GET_ALL_LOGS_FOR_A_PERIOD_ONEPERDAY_FAILED, payload });
//
export const getLogRequest = (payload: BaseLogPayload) => ({ type: GET_LOG_REQUEST, payload });
export const getLogSuccess = (payload: GetLogResponse) => ({ type: GET_LOG_SUCCESS , payload });
export const getLogFailed = (payload: any) => ({ type: GET_LOG_FAILED, payload });
//
export const postLogRequest = (payload: PostLogPayload) => ({ type: POST_LOG_REQUEST, payload });
export const postLogSuccess = (payload: BaseLogResponse) => ({ type: POST_LOG_SUCCESS , payload });
export const postLogFailed = (payload: any) => ({ type: POST_LOG_FAILED, payload });
//
export const delLogRequest = (payload: BaseLogPayload) => ({ type: DEL_LOG_REQUEST, payload });
export const delLogSuccess = (payload: BaseLogResponse) => ({ type: DEL_LOG_SUCCESS , payload });
export const delLogFailed = (payload: any) => ({ type: DEL_LOG_FAILED, payload });
//
export const patchLogRequest = (payload: PatchLogPayload) => ({ type: PATCH_LOG_REQUEST, payload });
export const patchLogSuccess = (payload: BaseLogResponse) => ({ type: PATCH_LOG_SUCCESS , payload });
export const patchLogFailed = (payload: any) => ({ type: PATCH_LOG_FAILED, payload });

type LogsAction =
    | ReturnType<typeof getLogsRequest>
    | ReturnType<typeof getLogsSuccess>
    | ReturnType<typeof getLogsFailed>
    | ReturnType<typeof getLogsForPeriodRequest>
    | ReturnType<typeof getLogsForPeriodSuccess>
    | ReturnType<typeof getLogsForPeriodFailed>
    | ReturnType<typeof getAllLogsForPeriodRequest>
    | ReturnType<typeof getAllLogsForPeriodSuccess>
    | ReturnType<typeof getAllLogsForPeriodFailed>
    | ReturnType<typeof getAllLogsForPeriodOneperdayRequest>
    | ReturnType<typeof getAllLogsForPeriodOneperdaySuccess>
    | ReturnType<typeof getAllLogsForPeriodOneperdayFailed>
    | ReturnType<typeof getLogRequest>
    | ReturnType<typeof getLogSuccess>
    | ReturnType<typeof getLogFailed>
    | ReturnType<typeof postLogRequest>
    | ReturnType<typeof postLogSuccess>
    | ReturnType<typeof postLogFailed>
    | ReturnType<typeof delLogRequest>
    | ReturnType<typeof delLogSuccess>
    | ReturnType<typeof delLogFailed>
    | ReturnType<typeof patchLogRequest>
    | ReturnType<typeof patchLogSuccess>
    | ReturnType<typeof patchLogFailed>

function* getLogsSaga(action: ReturnType<typeof getLogsRequest>) {
    try {
        const response: GetLogsResponse = yield call(getLogsApi, action.payload);
        yield put(getLogsSuccess(response));
    } catch (e) {
        yield put(getLogsFailed(e));
    }
}

function* getLogsForPeriodSaga(action: ReturnType<typeof getLogsForPeriodRequest>) {
    try {
        const response: GetLogsResponse = yield call(getLogsForPeriodApi, action.payload);
        yield put(getLogsForPeriodSuccess(response));
    } catch (e) {
        yield put(getLogsForPeriodFailed(e));
    }
}

function* getAllLogsForPeriodSaga(action: ReturnType<typeof getAllLogsForPeriodRequest>) {
    try {
        const response: GetLogsResponse = yield call(getAllLogsForPeriodApi, action.payload);
        yield put(getAllLogsForPeriodSuccess(response));
    } catch (e) {
        yield put(getAllLogsForPeriodFailed(e));
    }
}

function* getAllLogsForPeriodOneperdaySaga(action: ReturnType<typeof getAllLogsForPeriodRequest>) {
    try {
        const response: GetLogsResponse = yield call(getAllLogsForPeriodOneperdayApi, action.payload);
        yield put(getAllLogsForPeriodSuccess(response));
    } catch (e) {
        yield put(getAllLogsForPeriodFailed(e));
    }
}

function* getLogSaga(action: ReturnType<typeof getLogRequest>) {
    try {
        const response: GetLogResponse = yield call(getLogApi, action.payload);
        yield put(getLogSuccess(response));
    } catch (e) {
        yield put(getLogFailed(e));
    }
}

function* postLogSaga(action: ReturnType<typeof postLogRequest>) {
    try {
        const response: BaseLogResponse = yield call(postLogApi, action.payload);
        yield put(postLogSuccess(response));
    } catch (e) {
        yield put(postLogFailed(e));
    }
}

function* delLogSaga(action: ReturnType<typeof delLogRequest>) {
    try {
        const response: BaseLogResponse = yield call(delLogApi, action.payload);
        yield put(delLogSuccess(response));
    } catch (e) {
        yield put(delLogFailed(e));
    }
}

function* patchLogSaga(action: ReturnType<typeof patchLogRequest>) {
    try {
        const response: BaseLogResponse = yield call(patchLogApi, action.payload);
        yield put(patchLogSuccess(response));
    } catch (e) {
        yield put(patchLogFailed(e));
    }
}

export function* logsSaga() {
    yield takeEvery(GET_LOGS_REQUEST, getLogsSaga);
    yield takeEvery(GET_ALL_LOGS_FOR_A_PERIOD_REQUEST, getAllLogsForPeriodSaga);
    yield takeEvery(GET_ALL_LOGS_FOR_A_PERIOD_ONEPERDAY_REQUEST, getAllLogsForPeriodOneperdaySaga);
    yield takeEvery(GET_LOGS_FOR_A_PERIOD_REQUEST, getLogsForPeriodSaga);
    yield takeEvery(GET_LOG_REQUEST, getLogSaga);
    yield takeEvery(POST_LOG_REQUEST, postLogSaga);
    yield takeEvery(DEL_LOG_REQUEST, delLogSaga);
    yield takeEvery(PATCH_LOG_REQUEST, patchLogSaga);
}

interface LogsBunch {
    cntId: string;
    logs: LogType[];
    page: number;
    size: number;
    last: boolean;
}

type LogsState = {
    logsBunches: LogsBunch[];
    log: LogType;
    loading: boolean;
    error: any | null;
    changed: boolean;
};

const emptyLog = {
    inner_opened: 0,
    created_by: '',
    time: '',
    outer_opened: 0,
    outer_new: 0,
    inner_new: 0,
    cnt: '',
    comment: '',
    modified_by: '',
    id: ''
}

const initialState: LogsState = {
    // 복수의 이용자 데이터를 가져왔을 경우
    logsBunches: [], // 데이터 배열
    // 단일 데이터를 가져왔을 경우
    log: emptyLog,
    loading: false,
    error: null,
    changed: false
};


function logs( state: LogsState = initialState, action: LogsAction ): LogsState {
    switch (action.type) {
        case GET_LOGS_REQUEST:
        case GET_LOGS_FOR_A_PERIOD_REQUEST:
        case GET_ALL_LOGS_FOR_A_PERIOD_REQUEST:
        case GET_ALL_LOGS_FOR_A_PERIOD_ONEPERDAY_REQUEST:
        case GET_LOG_REQUEST:
        case POST_LOG_REQUEST:
        case DEL_LOG_REQUEST:
        case PATCH_LOG_REQUEST:
            return { ...state, loading: true };
        case GET_LOGS_SUCCESS:
        case GET_LOGS_FOR_A_PERIOD_SUCCESS:
        case GET_ALL_LOGS_FOR_A_PERIOD_SUCCESS:
        case GET_ALL_LOGS_FOR_A_PERIOD_ONEPERDAY_SUCCESS: {
            const { result, last, page, size } =  action.payload;
            if (result.length === 0) {
                return { ...state, loading: false, error: 'Warning: No results' }
            }
            const cntId = result[0]?.cnt;
            return {
                ...state, loading: false, error: null, changed: false,
                logsBunches: [
                    ...state.logsBunches,
                    { logs: result, cntId, last, page, size }
                ], 
            };
        }
        case GET_LOG_SUCCESS:
            return { ...state, loading: false, error: null, log: action.payload.result };
        case POST_LOG_SUCCESS:
        case DEL_LOG_SUCCESS:
        case PATCH_LOG_SUCCESS:
            return { ...state, loading: false, log: emptyLog, changed: true };
        case GET_LOGS_FAILED:
        case GET_ALL_LOGS_FOR_A_PERIOD_FAILED:
        case GET_ALL_LOGS_FOR_A_PERIOD_ONEPERDAY_FAILED:
        case GET_LOGS_FOR_A_PERIOD_FAILED:
        case GET_LOG_FAILED:
        case POST_LOG_FAILED:
        case DEL_LOG_FAILED:
        case PATCH_LOG_FAILED:
            return {...state, loading: false, error: action.payload};
        default:
            return state;
    }
}

export default logs;