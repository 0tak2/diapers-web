import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { Link as RouterLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../modules';
import { loginRequest } from '../modules/auth';

interface LoginFromProps {
  autoLoginFailed: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  alert: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 2,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, .8)',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }
}));

export default function LoginForm({ autoLoginFailed }: LoginFromProps) {
  const classes = useStyles();

  // A local state
  const initialAccountState = {
    username: "",
    password: ""
  }

  const [accountState, setAccountState] = useState(initialAccountState);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccountState({
      ...accountState,
      [e.target.name]: e.target.value
    });
  }

  // redux store
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);
  const loading = useSelector((state: RootState) => state.auth.loading);
  const error = useSelector((state: RootState) => state.auth.error);
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(loginRequest(accountState));
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      onClick();
    }
  }

  return (
    <>
      {
        autoLoginFailed ?
        <MuiAlert severity="warning" className={classes.alert}>
            자동 로그인에 실패했습니다. 세션이 만료되었을 수 있습니다. 계정 정보를 다시 입력해주세요.
        </MuiAlert>
        : (
          error ?
          <MuiAlert severity="error" className={classes.alert}>
              로그인에 실패했습니다. 아이디와 비밀번호를 다시 한 번 확인해보세요.
          </MuiAlert>
          : "")
      }
      <form className={classes.form}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="아이디"
          name="username"
          autoComplete="username"
          autoFocus
          onChange={onChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="비밀번호"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={onChange}
          onKeyPress={handleKeyPress}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={onClick}
        >
          로그인
        </Button>
        <Grid container>
          <Grid item>
            <a href='/admin/register' target="_blank">회원 등록</a><br /><br />
            * 계정 찾기 등은 관리자에게 문의하십시오. <br />
            * 시스템을 30분 이상 사용하지 않은 경우 로그인에 오랜 시간이 소요될 수 있습니다.
          </Grid>
        </Grid>
      </form>
      {loading ? <div className={classes.backdrop}><CircularProgress /></div> : ""}
      {isLogin ?
          <div className={classes.backdrop}>
            <p>이미 로그인하셨거나 잘못된 경로로 접근하셨습니다.</p>
            <Button color="primary" component={RouterLink} to="/">
                메인으로 돌아가기
            </Button>
          </div>
      : ""}
    </>
  );
}