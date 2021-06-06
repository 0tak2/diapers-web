import axios from 'axios';
import { getCookie } from '../utils/cookieUtil';

const baseUri = '/api/logs'

export interface LogType {
    inner_opened: number;
    created_by:   string;
    time:         string;
    outer_opened: number;
    outer_new:    number;
    inner_new:    number;
    cnt:          string;
    comment:      string;
    modified_by:  string;
    id:           string;
}

export interface LogsBunch {
    cntId: string;
    logs: LogType[];
    page: number;
    size: number;
    last: boolean;
}

export interface BaseLogPayload {
    logId: string;
}

export interface BaseLogResponse {
    success: boolean;
}

export interface GetLogResponse {
    success: boolean;
    result:  LogType;
}

export interface GetLogsPayload {
    cntId: string;
    page: number;
    size: number;
}

export interface GetLogsForPeriodPayload {
    cntId: string;
    page: number;
    size: number;
    start: string;
    end: string;
}

export interface GetAllLogsForPeriodPayload {
    cntId: string;
    start: string;
    end: string;
}

export interface GetLogsResponse {
    success: boolean;
    result:  LogType[];
    last:    boolean;
    page:    number;
    size:    number;
}

export interface PostLogPayload {
    cnt:          string;
    outer_opened: number;
    outer_new:    number;
    inner_new:    number;
    inner_opened: number;
    time:         string;
    comment:      string;
}

export interface PatchLogPayload {
    logId:           string;
    cnt:          string | null;
    outer_opened: number | null;
    outer_new:    number | null;
    inner_new:    number | null;
    inner_opened: number | null;
    time:         string | null;
    comment:      string | null;
}

export async function getLogsApi(payload: GetLogsPayload) {
    const response = await axios.get<GetLogsResponse>(
        baseUri + `/cnt/${payload.cntId}`,
        {
            withCredentials: true,
            params: {
                page: payload.page,
                size: payload.size
            }
        });
    return response.data;
}

export async function getLogsForPeriodApi(payload: GetLogsForPeriodPayload) {
    const response = await axios.get<GetLogsResponse>(
        baseUri + `/cnt/${payload.cntId}`,
        {
            withCredentials: true,
            params: {
                page: payload.page,
                size: payload.size,
                start: payload.start,
                end: payload.end
            }
        });
    return response.data;
}

export async function getAllLogsForPeriodApi(payload: GetAllLogsForPeriodPayload) {
    const response = await axios.get<GetLogsResponse>(
        baseUri + `/cnt/${payload.cntId}`,
        {
            withCredentials: true,
            params: {
                start: payload.start,
                end:  payload.end
            }
        });
    return response.data;
}

export async function getAllLogsForPeriodOneperdayApi(payload: GetAllLogsForPeriodPayload) {
    const response = await axios.get<GetLogsResponse>(
        baseUri + `/cnt/${payload.cntId}`,
        {
            withCredentials: true,
            params: {
                start: payload.start,
                end:  payload.end,
                oneperday: true
            }
        });
    return response.data;
}

export async function getLogApi(payload: BaseLogPayload) {
    const response = await axios.get<GetLogResponse>(
        baseUri + `/${payload.logId}`,
        { withCredentials: true }
    );
    return response.data;
}

export async function postLogApi(payload: PostLogPayload) {
    const response = await axios.post<BaseLogResponse>(
        baseUri,
        payload,
        {
            withCredentials: true,
            headers: {
                'X-CSRF-TOKEN': getCookie('csrf_access_token'),
            },
        });
    return response.data;
}

export async function delLogApi(payload: BaseLogPayload) {
    const response = await axios.delete<BaseLogResponse>(
        baseUri + `/${payload.logId}`,
        {
            withCredentials: true,
            headers: {
                'X-CSRF-TOKEN': getCookie('csrf_access_token'),
            },
        });
    return response.data;
}

export async function patchLogApi(payload: PatchLogPayload) {
    const {logId, ...payloadWithoutId} = payload;
    const response = await axios.patch<BaseLogResponse>(
        baseUri + `/${logId}`,
        payloadWithoutId,
        {
            withCredentials: true,
            headers: {
                'X-CSRF-TOKEN': getCookie('csrf_access_token'),
            },
        });
    return response.data;
}