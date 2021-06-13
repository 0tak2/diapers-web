import React, { useState, useEffect }  from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { getAllLogsForPeriodOneperdayRequest } from '../modules/logs';

import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles, Theme } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';

import { Line } from 'react-chartjs-2';

import PeriodControl from '../components/PeriodControl'
import { LogType } from '../api/logs';
import { dateHelper, timeNowHelper, timeBeforeAWeekHelper } from '../utils/dateUtil'

interface MatchParams {
    cntId: string;
}

const useStyles = makeStyles((theme: Theme) => ({
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
    },
    subtitle: {
        marginTop: theme.spacing(6),
    },
    paper: {
        marginTop: theme.spacing(2),
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4)
    }
  }));

function SummaryContainer({ match }: RouteComponentProps<MatchParams>) {
    const { cntId } = match.params;

    // local state
    const initialPeriodState = {
        start: timeBeforeAWeekHelper(true),
        end: timeNowHelper(true)
    }
    const [ periodState, setPeriodState ] = useState(initialPeriodState);

    const classes = useStyles();

    // redux store
    const loading = useSelector((state: RootState) => state.logs.loading);
    const error = useSelector((state: RootState) => state.logs.error);
    const logsBunches = useSelector((state: RootState) => state.logs.logsBunches);
    const dispatch = useDispatch();

    const matchedLogsBunch = (cntId: string) => {
        let bunch = {
            cntId: "",
            logs: [{ id: "", time: "", cnt: "", outer_opened: 0, outer_new: 0,
                        inner_opened: 0, inner_new: 0, comment: "", created_by: "", modified_by: ""  }],
            size: 0,
            page: 0,
            last: true
        };
        logsBunches.forEach((logsBunch) => {
            if (logsBunch.cntId === cntId) bunch = logsBunch; // 가장 마지막에 불러온 bunch가 반환됨
        })
        return bunch;
    }

    // effect
    useEffect(() => {
        if (cntId) dispatch(getAllLogsForPeriodOneperdayRequest({ cntId, start: periodState.start, end: periodState.end }));
    }, [cntId, periodState])
    
    const makeData = (logs: LogType[]) => {
        const labels = logs.map((log: LogType) => {
            return dateHelper(log.time, true);
        });
        const outerOpenedDataset = {
            label: "겉기저귀 (개봉)",
            data: logs.map((log: LogType) => {
                return log.outer_opened
            }),
            backgroundColor: 'rgb(231, 29, 54)',
            borderColor: 'rgba(231, 29, 54, 0.2)',
            fill: false,
        };
        const outerNewDataset = {
            label: "겉기저귀 (미개봉)",
            data: logs.map((log: LogType) => {
                return log.outer_new
            }),
            backgroundColor: 'rgb(46, 196, 182)',
            borderColor: 'rgba(46, 196, 182, 0.2)',
            fill: false,
        };
        const innerOpenedDataset = {
            label: "속기저귀 (개봉)",
            data: logs.map((log: LogType) => {
                return log.inner_opened
            }),
            backgroundColor: 'rgb(231, 29, 54)',
            borderColor: 'rgba(231, 29, 54, 0.2)',
            fill: false,
        };
        const innerNewDataset = {
            label: "속기저귀 (미개봉)",
            data: logs.map((log: LogType) => {
                return log.inner_new
            }),
            backgroundColor: 'rgb(46, 196, 182)',
            borderColor: 'rgba(46, 196, 182, 0.2)',
            fill: false,
        };

        return [{
            labels,
            datasets: new Array(outerOpenedDataset, outerNewDataset)
        },
        {
            labels,
            datasets: new Array(innerOpenedDataset, innerNewDataset)
        }];
    }

    interface PeriodPayload {
        start: string;
        end: string;
    }

    const onSubmitPeriod = (newPeriod: PeriodPayload) => {
        setPeriodState(newPeriod);
    }

    return (
        <>
            {error ? (matchedLogsBunch(cntId).logs[0].time !== '' ? // 단순히 조회된 데이터가 없는 경우를 걸러냄
                <MuiAlert severity="error">
                    오류가 발생했습니다. 문제가 반복되면 관리자에게 문의하세요.<br />
                    {error.toString()}
                </MuiAlert>
            : "") : ""}
            <PeriodControl currentPeriod={periodState} onSubmitPeriod={onSubmitPeriod} />
            {matchedLogsBunch(cntId).logs[0].time === '' ?
                <MuiAlert severity="warning">
                    해당 기간 동안의 데이터가 존재하지 않습니다.
                </MuiAlert>
                :
                <>
                    <Paper className={classes.paper}>
                        <Typography className={classes.subtitle} variant="h4" component="h2">겉 기저귀 재고 추이</Typography>
                        <Line data={makeData([...matchedLogsBunch(cntId).logs].reverse())[0]} />
                    </Paper>
                    <Paper className={classes.paper}>
                        <Typography className={classes.subtitle} variant="h4" component="h2">속 기저귀 재고 추이</Typography>
                        <Line data={makeData([...matchedLogsBunch(cntId).logs].reverse())[1]} />
                    </Paper>
                </>
            }
            {loading ? <div className={classes.backdrop}><CircularProgress /></div> : ""}
        </>
       
    )
}

export default SummaryContainer;