import { call, put, takeEvery, all } from 'redux-saga/effects';
import { GetCntsAllResponse,  GetCntsPageResponse, GetCntResponse,
                BaseCntResponse, PostCntPayload, PatchCntPayload,
                getCntsAllApi, getCntsPageApi, GetCntPagePayload,
                BaseCntPayload, getCntApi, postCntApi, delCntApi,
                patchCntApi, CntType } from '../api/cnts';
import { getLogsRequest } from './logs';

const GET_CNTS_ALL_REQUEST = 'cnts/GET_CNTS_ALL_REQUEST' as const;
const GET_CNTS_ALL_SUCCESS = 'cnts/GET_CNTS_ALL_SUCCESS' as const;
const GET_CNTS_ALL_FAILED = 'cnts/GET_CNTS_ALL_FAILED' as const;

const GET_CNTS_PAGE_REQUEST = 'cnts/GET_CNTS_PAGE_REQUEST' as const;
const GET_CNTS_PAGE_SUCCESS = 'cnts/GET_CNTS_PAGE_SUCCESS' as const;
const GET_CNTS_PAGE_FAILED = 'cnts/GET_CNTS_PAGE_FAILED' as const;

const GET_CNTS_PAGE_AND_RECENT_LOG_REQUEST = 'cnts/GET_CNTS_PAGE_AND_RECENT_LOG_REQUEST' as const;
const GET_CNTS_PAGE_AND_RECENT_LOG_SUCCESS = 'cnts/GET_CNTS_PAGE_AND_RECENT_LOG_SUCCESS' as const;
const GET_CNTS_PAGE_AND_RECENT_LOG_FAILED = 'cnts/GET_CNTS_PAGE_AND_RECENT_LOG_FAILED' as const;

const GET_CNT_REQUEST = 'cnts/GET_CNT_REQUEST' as const;
const GET_CNT_SUCCESS = 'cnts/GET_CNT_SUCCESS' as const;
const GET_CNT_FAILED = 'cnts/GET_CNT_FAILED' as const;

const POST_CNT_REQUEST = 'cnts/POST_CNT_REQUEST' as const;
const POST_CNT_SUCCESS = 'cnts/POST_CNT_SUCCESS' as const;
const POST_CNT_FAILED = 'cnts/POST_CNT_FAILED' as const;

const DEL_CNT_REQUEST = 'cnts/DEL_CNT_REQUEST' as const;
const DEL_CNT_SUCCESS = 'cnts/DEL_CNT_SUCCESS' as const;
const DEL_CNT_FAILED = 'cnts/DEL_CNT_FAILED' as const;

const PATCH_CNT_REQUEST = 'cnts/PATCH_CNT_REQUEST' as const;
const PATCH_CNT_SUCCESS = 'cnts/PATCH_CNT_SUCCESS' as const;
const PATCH_CNT_FAILED = 'cnts/PATCH_CNT_FAILED' as const;

export const getCntsAllRequest = () => ({ type: GET_CNTS_ALL_REQUEST});
export const getCntsAllSuccess = (payload: GetCntsAllResponse) => ({ type: GET_CNTS_ALL_SUCCESS , payload });
export const getCntsAllFailed = (payload: any) => ({ type: GET_CNTS_ALL_FAILED, payload });
//
export const getCntsPageRequest = (payload: GetCntPagePayload) => ({ type: GET_CNTS_PAGE_REQUEST, payload });
export const getCntsPageSuccess = (payload: GetCntsPageResponse) => ({ type: GET_CNTS_PAGE_SUCCESS , payload });
export const getCntsPageFailed = (payload: any) => ({ type: GET_CNTS_PAGE_FAILED, payload });
//
export const getCntsPageAndRecentLogRequest = (payload: GetCntPagePayload) => ({ type: GET_CNTS_PAGE_AND_RECENT_LOG_REQUEST, payload });
export const getCntsPageAndRecentLogSuccess = (payload: GetCntsPageResponse) => ({ type: GET_CNTS_PAGE_AND_RECENT_LOG_SUCCESS , payload });
export const getCntsPageAndRecentLogFailed = (payload: any) => ({ type: GET_CNTS_PAGE_AND_RECENT_LOG_FAILED, payload });
//
export const getCntRequest = (payload: BaseCntPayload) => ({ type: GET_CNT_REQUEST, payload });
export const getCntSuccess = (payload: GetCntResponse) => ({ type: GET_CNT_SUCCESS , payload });
export const getCntFailed = (payload: any) => ({ type: GET_CNT_FAILED, payload });
//
export const postCntRequest = (payload: PostCntPayload) => ({ type: POST_CNT_REQUEST, payload });
export const postCntSuccess = (payload: BaseCntResponse) => ({ type: POST_CNT_SUCCESS , payload });
export const postCntFailed = (payload: any) => ({ type: POST_CNT_FAILED, payload });
//
export const delCntRequest = (payload: BaseCntPayload) => ({ type: DEL_CNT_REQUEST, payload });
export const delCntSuccess = (payload: BaseCntResponse) => ({ type: DEL_CNT_SUCCESS , payload });
export const delCntFailed = (payload: any) => ({ type: DEL_CNT_FAILED, payload });
//
export const patchCntRequest = (payload: PatchCntPayload) => ({ type: PATCH_CNT_REQUEST, payload });
export const patchCntSuccess = (payload: BaseCntResponse) => ({ type: PATCH_CNT_SUCCESS , payload });
export const patchCntFailed = (payload: any) => ({ type: PATCH_CNT_FAILED, payload });

type CntsAction =
    | ReturnType<typeof getCntsAllRequest>
    | ReturnType<typeof getCntsAllSuccess>
    | ReturnType<typeof getCntsAllFailed>
    | ReturnType<typeof getCntsPageRequest>
    | ReturnType<typeof getCntsPageSuccess>
    | ReturnType<typeof getCntsPageFailed>
    | ReturnType<typeof getCntsPageAndRecentLogRequest>
    | ReturnType<typeof getCntsPageAndRecentLogSuccess>
    | ReturnType<typeof getCntsPageAndRecentLogFailed>
    | ReturnType<typeof getCntRequest>
    | ReturnType<typeof getCntSuccess>
    | ReturnType<typeof getCntFailed>
    | ReturnType<typeof postCntRequest>
    | ReturnType<typeof postCntSuccess>
    | ReturnType<typeof postCntFailed>
    | ReturnType<typeof delCntRequest>
    | ReturnType<typeof delCntSuccess>
    | ReturnType<typeof delCntFailed>
    | ReturnType<typeof patchCntRequest>
    | ReturnType<typeof patchCntSuccess>
    | ReturnType<typeof patchCntFailed>

function* getCntsAllSaga() {
    try {
        const response: GetCntsAllResponse = yield call(getCntsAllApi);
        yield put(getCntsAllSuccess(response));
    } catch (e) {
        yield put(getCntsAllFailed(e.response.data));
    }
}

function* getCntsPageSaga(action: ReturnType<typeof getCntsPageRequest>) {
    try {
        const response: GetCntsPageResponse = yield call(getCntsPageApi, action.payload);
        yield put(getCntsPageSuccess(response));
    } catch (e) {
        yield put(getCntsPageFailed(e.response.data));
    }
}

function* getCntsPageAndRecentLogSaga(action: ReturnType<typeof getCntsPageRequest>) {
    try {
        const response: GetCntsPageResponse = yield call(getCntsPageApi, action.payload);
        yield put(getCntsPageAndRecentLogSuccess(response));
    } catch (e) {
        yield put(getCntsPageAndRecentLogFailed(e.response.data));
    }
}

function* getCntsPageAndRecentLogSuccessSaga(action: ReturnType<typeof getCntsPageSuccess>) {
    yield all(action.payload.result.map((cnt) => put(getLogsRequest({ cntId: cnt.id, page: 0, size: 1 }))));
}

function* getCntSaga(action: ReturnType<typeof getCntRequest>) { //get
    try {
        const response: GetCntResponse = yield call(getCntApi, action.payload);
        yield put(getCntSuccess(response));
    } catch (e) {
        yield put(getCntFailed(e.response.data));
    }
}

function* postCntSaga(action: ReturnType<typeof postCntRequest>) { //post
    try {
        const response: BaseCntResponse = yield call(postCntApi, action.payload);
        yield put(postCntSuccess(response));
    } catch (e) {
        yield put(postCntFailed(e.response.data));
    }
}

function* delCntSaga(action: ReturnType<typeof delCntRequest>) { //del
    try {
        const response: BaseCntResponse = yield call(delCntApi, action.payload);
        yield put(delCntSuccess(response));
    } catch (e) {
        yield put(delCntFailed(e.response.data));
    }
}

function* patchCntSaga(action: ReturnType<typeof patchCntRequest>) { //patch
    try {
        const response: BaseCntResponse = yield call(patchCntApi, action.payload);
        yield put(patchCntSuccess(response));
    } catch (e) {
        yield put(patchCntFailed(e.response.data));
    }
}

export function* cntsSaga() {
    yield takeEvery(GET_CNTS_ALL_REQUEST, getCntsAllSaga);
    yield takeEvery(GET_CNTS_PAGE_REQUEST, getCntsPageSaga);
    yield takeEvery(GET_CNTS_PAGE_AND_RECENT_LOG_REQUEST, getCntsPageAndRecentLogSaga);
    yield takeEvery(GET_CNTS_PAGE_AND_RECENT_LOG_SUCCESS, getCntsPageAndRecentLogSuccessSaga);
    yield takeEvery(GET_CNT_REQUEST, getCntSaga);
    yield takeEvery(POST_CNT_REQUEST, postCntSaga);
    yield takeEvery(DEL_CNT_REQUEST, delCntSaga);
    yield takeEvery(PATCH_CNT_REQUEST, patchCntSaga);
}

type CntsState = {
    cnts: CntType[] | null;
    page: number | null;
    size: number | null;
    last: boolean | null;
    cnt: CntType | null;
    loading: boolean
    error: any | null;
};

const initialState: CntsState = {
    // 복수의 이용자 데이터를 가져왔을 경우
    cnts: null, // 데이터 배열
    page: null, // 현재 페이지 번호
    size: null, // 한 페이지의 크기
    last: null, // 마지막 페이지 여부
    // 단일 데이터를 가져왔을 경우
    cnt: null,
    loading: false,
    error: null
};

function cnts( state: CntsState = initialState, action: CntsAction ): CntsState {
    switch (action.type) {
        case GET_CNTS_ALL_REQUEST:
        case GET_CNTS_PAGE_REQUEST:
        case GET_CNTS_PAGE_AND_RECENT_LOG_REQUEST:
        case GET_CNT_REQUEST:
        case POST_CNT_REQUEST:
        case DEL_CNT_REQUEST:
        case PATCH_CNT_REQUEST:
            return { ...state, loading: true };
        case GET_CNTS_ALL_SUCCESS: {
            const { result } =  action.payload;
            return { ...state, loading: false, error: null, cnts: result, page: null, size: null, last: null };
        }
        case GET_CNTS_PAGE_SUCCESS:
        case GET_CNTS_PAGE_AND_RECENT_LOG_SUCCESS: {
            const { result, last, page, size } =  action.payload;
            return { ...state, loading: false, error: null, cnts: result, last, page, size };
        }
        case GET_CNT_SUCCESS:
            return { ...state, loading: false, error: null, cnt: action.payload.result };
        case POST_CNT_SUCCESS:
        case DEL_CNT_SUCCESS:
        case PATCH_CNT_SUCCESS:
            return { ...state, loading: false, cnt: null };
        case GET_CNTS_ALL_FAILED:
        case GET_CNTS_PAGE_FAILED:
        case GET_CNTS_PAGE_AND_RECENT_LOG_FAILED:
        case GET_CNT_FAILED:
        case POST_CNT_FAILED:
        case DEL_CNT_FAILED:
        case PATCH_CNT_FAILED:
            return {...state, loading: false, error: action.payload};
        default:
            return state;
    }
}

export default cnts;