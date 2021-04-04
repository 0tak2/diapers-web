import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { logoutRequest } from '../modules/auth';

import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import LoginPanel from '../components/LoginPanel';

function LoginPanelContainer() {
    const onClickLogout = () => {
        dispatch(logoutRequest());
    }

    // redux store
    const isLogin = useSelector((state: RootState) => state.auth.isLogin);
    const username = useSelector((state: RootState) => state.auth.username);
    const userdata = useSelector((state: RootState) => state.auth.userdata);
    const { realname, description, level } = userdata ? userdata: {realname: "", description: "", level: -1};
    const dispatch = useDispatch();

    return (
        <>
            {isLogin ?
                    <LoginPanel username={username} realname={realname} description={description} level={level} onClick={onClickLogout}></LoginPanel>:
                    <Container><div>
                        <p>로그인하셔야 모든 기능을 이용하실 수 있습니다.</p>
                        <Button variant="contained" color="secondary" component={RouterLink} to="/login">
                            로그인
                        </Button>
                    </div></Container>
            }
        </>
    );
}

export default LoginPanelContainer;