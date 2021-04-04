import React, { useState, useEffect  } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Card, CardContent, CardActions, Button, IconButton, Typography, Grid, TextField } from '@material-ui/core';
import PlusIcon from '@material-ui/icons/Add';
import MinusIcon from '@material-ui/icons/Remove';

import { LogType, PostLogPayload } from '../api/logs';
import { timeNowHelper } from '../utils/dateUtil';

interface LogsBunch {
  cntId: string;
  logs: LogType[];
  page: number;
  size: number;
  last: boolean;
}

interface LogPostControlProps {
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
      paddingBottom: theme.spacing(2),
  },
  alert: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  centerWrapper: {
    textAlign: 'center',
  }
}));

function LogPostControl({ bunch, onSubmit, error }: LogPostControlProps) {
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

  const onIncrement = (name: string) => {
    switch (name) {
      case "outer_opened":
        setLogState({
          ...logState,
          outer_opened: logState.outer_opened + 1
        });
        return;
      case "outer_new":
        setLogState({
          ...logState,
          outer_new: logState.outer_new + 1
        });
        return;
      case "inner_opened":
        setLogState({
          ...logState,
          inner_opened: logState.inner_opened + 1
        });
        return;
      case "inner_new":
        setLogState({
          ...logState,
          inner_new: logState.inner_new + 1
        });
        return;
      default:
        return;
    }
  }

  const onDecrement = (name: string) => {
    switch (name) {
      case "outer_opened":
        setLogState({
          ...logState,
          outer_opened: logState.outer_opened - 1
        });
        return;
      case "outer_new":
        setLogState({
          ...logState,
          outer_new: logState.outer_new - 1
        });
        return;
      case "inner_opened":
        setLogState({
          ...logState,
          inner_opened: logState.inner_opened - 1
        });
        return;
      case "inner_new":
        setLogState({
          ...logState,
          inner_new: logState.inner_new - 1
        });
        return;
      default:
        return;
    }
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
          <Typography variant="caption">
            자동으로 최근 수량과 현재 시간을 불러왔습니다.
          </Typography>
        <form>
          <div className={classes.gridRoot}>
          <Grid container spacing={1} justify="center" alignItems="center">
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
            <Grid item xs={6}>
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
            <Grid item xs={1}>
            <div className={classes.centerWrapper}>
              <IconButton
                color="secondary"
                aria-label="Decrease number"
                size="small"
                onClick={() => onDecrement("outer_opened")}
                component="span"
              >
                <MinusIcon />
              </IconButton>
            </div>
            </Grid>
            <Grid item xs={1}>
            <div className={classes.centerWrapper}>
              <IconButton
                color="primary"
                aria-label="increase number"
                size="small"
                onClick={() => onIncrement("outer_opened")}
                component="span"
              >
                <PlusIcon />
              </IconButton>
            </div>
            </Grid>
            <Grid item xs={4}>
            <Typography variant="body1">겉 기저귀 (미개봉 팩)</Typography>
            </Grid>
            <Grid item xs={6}>
            <TextField
                required
                fullWidth
                id="outer_new"
                name="outer_new"
                value={logState.outer_new}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={1}>
            <div className={classes.centerWrapper}>
              <IconButton
                color="secondary"
                aria-label="Decrease number"
                size="small"
                onClick={() => onDecrement("outer_new")}
                component="span"
              >
                <MinusIcon />
              </IconButton>              
            </div>
            </Grid>
            <Grid item xs={1}>
            <div className={classes.centerWrapper}>
              <IconButton
                color="primary"
                aria-label="increase number"
                size="small"
                onClick={() => onIncrement("outer_new")}
                component="span"
              >
                <PlusIcon />
              </IconButton>              
            </div>
            </Grid>
            <Grid item xs={4}>
            <Typography variant="body1">속 기저귀 (개봉 팩)</Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                id="inner_opened"
                name="inner_opened"
                value={logState.inner_opened}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={1}>
            <div className={classes.centerWrapper}>
              <IconButton
                color="secondary"
                aria-label="Decrease number"
                size="small"
                onClick={() => onDecrement("inner_opened")}
                component="span"
              >
                <MinusIcon />
              </IconButton>              
            </div>
            </Grid>
            <Grid item xs={1}>
            <div className={classes.centerWrapper}>
              <IconButton
                color="primary"
                aria-label="increase number"
                size="small"
                onClick={() => onIncrement("inner_opened")}
                component="span"
              >
                <PlusIcon />
              </IconButton>              
            </div>
            </Grid>
            <Grid item xs={4}>
            <Typography variant="body1">속 기저귀 (미개봉 팩)</Typography>
            </Grid>
            <Grid item xs={6}>
            <TextField
                required
                fullWidth
                id="inner_new"
                name="inner_new"
                value={logState.inner_new}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={1}>
            <div className={classes.centerWrapper}>
              <IconButton
                color="secondary"
                aria-label="Decrease number"
                size="small"
                onClick={() => onDecrement("inner_new")}
                component="span"
              >
                <MinusIcon />
              </IconButton>              
            </div>
            </Grid>
            <Grid item xs={1}>
            <div className={classes.centerWrapper}>
              <IconButton
                color="primary"
                aria-label="increase number"
                size="small"
                onClick={() => onIncrement("inner_new")}
                component="span"
              >
                <PlusIcon />
              </IconButton>              
            </div>
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
      <Button size="medium" color="primary" onClick={() => onSubmit(logState)}>저장</Button>
      <Button size="medium" onClick={onReset}>초기화</Button>
      </CardActions>
    </Card>
    </>
  );
}

export default LogPostControl;