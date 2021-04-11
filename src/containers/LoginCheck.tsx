import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { Link as RouterLink, withRouter, RouteComponentProps } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { getUserdataRequest } from '../modules/auth';

import { getAccountInfo } from '../utils/accountInfoUtil';

interface LoginCheckProps {
  children: React.ReactNode;
}

interface params extends LoginCheckProps, RouteComponentProps {
}

const useStyles = makeStyles((theme: Theme) => ({
  backdrop: {
    position: 'sticky',
    top: 0,
    left: 0,
    zIndex: 2,
    width: '100vw',
    height: '100vh',
    background: 'rgba(0, 0, 0, .8)',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }
}));

function LoginCheck({ children, history }: params) {
  const classes = useStyles();

  // redux store
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);
  const error = useSelector((state: RootState) => state.auth.error);
  const dispatch = useDispatch();

  // useEffect
  useEffect(() => {
    if (!isLogin) {
        const { username, userdata } = getAccountInfo();
        if (username !== 'null' && userdata !== 'null') dispatch(getUserdataRequest());
    }
}, []);

useEffect(() => {
  if (error) {
      history.push("/login/auto-login-failed")
  }
}, [error]);

  return (
    <>
        {!isLogin ?
            <div className={classes.backdrop}>
                <p>이 페이지에 접근할 권한이 없습니다.</p>
                <Button variant="contained" color="secondary" component={RouterLink} to="/login">
                    로그인
                </Button>
            </div>
        : children }
    </>
  );
}

export default withRouter(LoginCheck);