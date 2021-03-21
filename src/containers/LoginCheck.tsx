import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootState } from '../modules';

type LoginCheckProps = {
  children: React.ReactNode;
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

export default function LoginCheck({ children }: LoginCheckProps) {
  const classes = useStyles();

  // redux store
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);

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