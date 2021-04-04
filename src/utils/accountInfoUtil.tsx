import { UserData } from '../api/auth'

export const saveAccountInfo = (username: string, userdata: UserData) => {
    localStorage.username = username;
    localStorage.userdata = JSON.stringify(userdata);
}

export const delAccountInfo = () => {
    localStorage.username = null;
    localStorage.userdata = null;
}

export const getAccountInfo = () => {
    if (localStorage.username !== undefined && localStorage !== undefined) {
        return {
            username: localStorage.username,
            userdata: JSON.parse(localStorage.userdata)
        }
    } else {
        return {
            username: null,
            userdata: null
        }
    }
}