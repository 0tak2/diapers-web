import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { login, logout } from '../modules/auth';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  }
}));

export default function Login() {
  const classes = useStyles();

  // A local state
  const initialState = {
    username: "",
    password: ""
  }

  const [state, setState] = useState(initialState);

  const onChange = (e: any) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  }

  // redux store
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(login(state));
  }
  const onClick2 = () => {
    dispatch(logout());
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img src="./diapers-logo.png" alt="A logo of the service."></img>
        <Typography component="h1" variant="h5">
            DIAPERS @ 한벗둥지
        </Typography>
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
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="자동 로그인"
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
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onClick2}
          >
            로그아웃
          </Button>
          <Grid container>
            <Grid item>
              <Link href="#" variant="body2">
                도움말
              </Link>
            </Grid>
          </Grid>
        </form>
        <div>
          [DEBUG INFO]<br />
          username: {state.username}<br />
          password: {state.password}<br />
        </div>
        {isLoading ? <div>loading</div> : null}
      </div>
    </Container>
  );
}