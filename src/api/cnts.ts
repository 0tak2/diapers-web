import axios from 'axios';

const baseUri = '/api/cnts'

export interface CntType {
    description:   string;
    birth:         string;
    inner_product: string;
    outer_product: string;
    deactivated:   boolean;
    name:          string;
    id:            string;
}

export interface GetCntsAllResponse {
    success: boolean;
    result:  CntType[];
}

export interface GetCntPagePayload {
    page: number;
    size: number;
}

export interface GetCntsPageResponse {
    success: boolean;
    result:  CntType[];
    last:    boolean;
    page:    number;
    size:    number;
}

export interface GetCntResponse {
    success: boolean;
    result:  CntType;
}

export interface BaseCntPayload {
    cntId: string;
}

export interface BaseCntResponse {
    success: boolean;
}

export interface PostCntPayload {
    name:          string;
    birth:         string;
    description:   string;
    inner_product: string;
    outer_product: string;
}

export interface PatchCntPayload {
    cntId: string;
    name:          string | null;
    birth:         string | null;
    description:   string | null;
    inner_product: string | null;
    outer_product: string | null;
}

export async function getCntsAllApi() {
    const response = await axios.get<GetCntsAllResponse>(
        baseUri,
        { withCredentials: true }
    );
    return response.data;
}

export async function getCntsPageApi(payload: GetCntPagePayload) {
    const response = await axios.get<GetCntsPageResponse>(
        baseUri,
        {
            withCredentials: true,
            params: {
                page: payload.page,
                size: payload.size
            }
        });
    return response.data;
}

export async function getCntApi(payload: BaseCntPayload) {
    const response = await axios.get<GetCntResponse>(
        baseUri + `/${payload.cntId}`,
        { withCredentials: true });
    return response.data;
}

export async function postCntApi(payload: PostCntPayload) {
    const response = await axios.post<BaseCntResponse>(
        baseUri,
        payload,
        { withCredentials: true });
    return response.data;
}

export async function delCntApi(payload: BaseCntPayload) {
    const response = await axios.delete<BaseCntResponse>(
        baseUri + `/${payload.cntId}`,
        { withCredentials: true });
    return response.data;
}

export async function patchCntApi(payload: PatchCntPayload) {
    const { cntId, ...payloadWithdoutId } = payload;
    const response = await axios.patch<BaseCntResponse>(
        baseUri + `/${cntId}`,
        payloadWithdoutId,
        { withCredentials: true });
    return response.data;
}