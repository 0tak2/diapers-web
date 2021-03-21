import axios from 'axios';

const uris = {
    login: "/api/auth/loginc",
    logout: "/api/auth/logoutc",
    getUserData: "/api/auth/login"
};

export interface LoginResponse {
    success:      boolean;
    user_data:    UserData;
    username:     string;
}

export interface UserData {
    description: string;
    level:       number;
    realname:    string;
}

export interface LoginPayload  {
    username: string;
    password: string;
}

export interface LogoutResponse {
    msg:     string;
    success: boolean;
}

export async function loginApi(payload: LoginPayload) {
    const response = await axios.post<LoginResponse>(
        uris.login,
        payload,
        { withCredentials: true }
    );
    return response.data;
}

export async function logoutApi() {
    const response = await axios.post<LogoutResponse>(
        uris.logout,
        "",
        { withCredentials: true }
    );
    return response.data;
}

export async function  getUserdataApi() {
    const response = await axios.get<LoginResponse>(
        uris.getUserData,
        { withCredentials: true }
    );
    return response.data;
}