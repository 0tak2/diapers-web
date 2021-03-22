import React, { useState, useEffect  } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Card, CardContent, CardActions, Button, Typography, Grid, TextField } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

import { LogType, PostLogPayload } from '../api/logs';
import { timeNowHelper } from '../utils/dateUtil';

interface LogsBunch {
  cntId: string;
  logs: LogType[];
  page: number;
  size: number;
  last: boolean;
}

interface LogControlProps {
    bunch: LogsBunch;
    onSubmit: (payload: PostLogPayload) => void;
    error: any;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minWidth: 275,
    marginBottom: theme.spacing(2),
  },
  gridRoot: {
      flexGrow: 1,
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(2)
  },
  alert: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  }
}));

function LogControl({ bunch, onSubmit, error }: LogControlProps) {
  const classes = useStyles();

  // local state
  const recentLog = bunch.logs[0];
  const initialLog = {
    cnt: bunch.cntId,
    outer_opened: recentLog.outer_opened,
    outer_new: recentLog.outer_new,
    inner_opened: recentLog.inner_opened,
    inner_new: recentLog.inner_new,
    comment: "",
    time: timeNowHelper(true)
  };
  const [logState, setLogState] = useState(initialLog);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogState({
      ...logState,
      [e.target.name]: e.target.value
    });
  }

  const onReset = () => {
    setLogState(initialLog);
  }

  // effect
  useEffect(() => {
    setLogState(initialLog);
  }, [bunch])

  return (
    <>
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
          재고 입력
        </Typography>
        {error ?
          <MuiAlert severity="error" className={classes.alert}>
              저장에 실패했습니다. 문제가 반복되면 관리자에게 문의하세요.
          </MuiAlert>
        : ""}
          <Typography variant="caption">
            자동으로 최근 수량과 현재 시간을 불러왔습니다.
          </Typography>
        <form>
          <div className={classes.gridRoot}>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <Typography variant="body1">기준 시간</Typography>
            </Grid>
            <Grid item xs={8}>
            <TextField
                required
                fullWidth
                id="time"
                name="time"
                value={logState.time}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={4}>
            <Typography variant="body1">겉 기저귀 (개봉 팩)</Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField
                required
                fullWidth
                id="outer_opened"
                name="outer_opened"
                value={logState.outer_opened}
                onChange={onChange}
                autoFocus
              />
            </Grid>
            <Grid item xs={4}>
            <Typography variant="body1">겉 기저귀 (미개봉 팩)</Typography>
            </Grid>
            <Grid item xs={8}>
            <TextField
                required
                fullWidth
                id="outer_new"
                name="outer_new"
                value={logState.outer_new}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={4}>
            <Typography variant="body1">속 기저귀 (개봉 팩)</Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField
                required
                fullWidth
                id="inner_opened"
                name="inner_opened"
                value={logState.inner_opened}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={4}>
            <Typography variant="body1">속 기저귀 (미개봉 팩)</Typography>
            </Grid>
            <Grid item xs={8}>
            <TextField
                required
                fullWidth
                id="inner_new"
                name="inner_new"
                value={logState.inner_new}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={4}>
            <Typography variant="body1">비고</Typography>
            </Grid>
            <Grid item xs={8}>
            <TextField
                required
                fullWidth
                id="comment"
                name="comment"
                value={logState.comment}
                onChange={onChange}
              />
            </Grid>
          </Grid>
        </div>
      </form>
      </CardContent>
      <CardActions>
      <Button size="medium" onClick={() => onSubmit(logState)}>저장</Button>
      <Button size="medium" onClick={onReset}>초기화</Button>
      </CardActions>
    </Card>
    </>
  );
}

export default LogControl;