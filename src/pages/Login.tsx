import React from 'react';
import LoginForm from '../components/LoginForm';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
}));

function Login() {
    const classes = useStyles();

    return (
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img src="./diapers-logo.png" alt="A logo of the service."></img>
        <Typography component="h1" variant="h5">
            DIAPERS @ 한벗둥지
        </Typography>
        <LoginForm />
      </div>
    </Container>
    );
}

export default Login;