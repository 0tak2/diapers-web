import React from 'react';
import { Route } from 'react-router-dom';
import About from './pages/About';
import Main from './pages/Main';
import Log from './pages/Log';
import Summary from './pages/Summary';
import Report from './pages/Report';
import Login from './pages/Login';
import CssBaseline from '@material-ui/core/CssBaseline';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Noto Sans KR',
      'Roboto',
      '-apple-system',
      'sans-serif',
    ].join(','),
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Route path="/" exact component={Main} />
        <Route path="/log" component={Log} />
        <Route path="/summary" component={Summary} />
        <Route path="/report" component={Report} />
        <Route path="/about" component={About} />
        <Route path="/login" component={Login} />
      </ThemeProvider>
    </>
  );
}

export default App;
