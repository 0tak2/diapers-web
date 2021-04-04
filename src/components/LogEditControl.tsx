import React, { useState, useEffect  } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Card, CardContent, CardActions, Button, IconButton, Typography, Grid, TextField } from '@material-ui/core';
import PlusIcon from '@material-ui/icons/Add';
import MinusIcon from '@material-ui/icons/Remove';
import MuiAlert from '@material-ui/lab/Alert';

import { LogType, PatchLogPayload } from '../api/logs';
import { dateHelper } from '../utils/dateUtil';

interface LogEditControlProps {
    logId: string;
    log: LogType;
    onSubmit: (payload: PatchLogPayload) => void;
    onDelete: () => void;
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

function LogEditControl({ logId, log, onSubmit, onDelete, error }: LogEditControlProps) {
  const classes = useStyles();

  // local state
  const initialLog = {
    cnt: log.cnt,
    outer_opened: log.outer_opened,
    outer_new: log.outer_new,
    inner_opened: log.inner_opened,
    inner_new: log.inner_new,
    comment: log.comment,
    time: dateHelper(log.time,true),
    logId: logId
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
  }, [log])

  return (
    <>
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
          재고 수정
        </Typography>
        {error ?
          <MuiAlert severity="error" className={classes.alert}>
              저장에 실패했습니다. 문제가 반복되면 관리자에게 문의하세요.
          </MuiAlert>
        : ""}
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
        <Button size="medium" component={RouterLink} to={`/log/${log.cnt}`}>뒤로가기</Button>
        <Button size="medium" color="secondary" onClick={onDelete}>삭제</Button>
      </CardActions>
    </Card>
    </>
  );
}

export default LogEditControl;