import React, { useState, useEffect } from 'react';

import { makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

interface PeriodPayload {
  start: string;
  end: string;
}

interface PeriodControlProps {
  currentPeriod: PeriodPayload;
  onSubmitPeriod: (newPeriod: PeriodPayload) => void;
};

const useStyles = makeStyles((theme: Theme) => ({
  gridRoot: {
      flexGrow: 1,
  },
  centerWrapper: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'left',
    marginBottom: theme.spacing(3)
  },
  leftWrapper: {
    textAlign: 'left',
  },
  rightWrapper: {
    textAlign: 'right',
  },
  paper: {
    padding: theme.spacing(2)
  }
}));

function PeriodControl({ currentPeriod, onSubmitPeriod }: PeriodControlProps) {
  const classes = useStyles();

  // local state
  const initialPeriodState = {
    startDate: currentPeriod.start.split(' ')[0],
    startTime: currentPeriod.start.split(' ')[1],
    endDate: currentPeriod.end.split(' ')[0],
    endTime: currentPeriod.end.split(' ')[1],
  }
  const [ periodState, setPeriodState ] = useState(initialPeriodState);
  const { startDate, startTime, endDate, endTime } = periodState;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPeriodState({
      ...periodState,
      [e.target.name]: e.target.value
    });
  }

  return (
    <Paper variant="outlined" className={classes.paper}>
      <div className={classes.gridRoot}>
          <Grid container justify="space-between" alignItems="center">
            <Grid item xs={12}>
              <div className={classes.subtitle}>
                <Typography variant="h5" component="h2">
                  조회 기간 지정
                </Typography>                
              </div>
            </Grid>
            <Grid item xs={5}>
              <div className={classes.centerWrapper}>
                <TextField
                  id="startDate"
                  name="startDate"
                  label="시작 일자"
                  type="date"
                  onChange={onChange}
                  defaultValue={startDate}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  id="startTime"
                  name="startTime"
                  label="시작 시간"
                  type="time"
                  onChange={onChange}
                  defaultValue={startTime}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />              
              </div>
            </Grid>
            <Grid item xs={5}>
              <div className={classes.centerWrapper}>
                <TextField
                  id="endDate"
                  name="endDate"
                  label="종료 일자"
                  type="date"
                  onChange={onChange}
                  defaultValue={endDate}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  id="endTime"
                  name="endTime"
                  label="종료 시간"
                  type="time"
                  onChange={onChange}
                  defaultValue={endTime}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />              
              </div>
            </Grid>
            <Grid item xs={2}>
              <div className={classes.centerWrapper}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => onSubmitPeriod({ start: startDate + ' ' + startTime, end: endDate + ' ' + endTime })}>
                  조회
                </Button>
              </div>
            </Grid>
          </Grid>
      </div>
    </Paper>
  );
}

export default PeriodControl;