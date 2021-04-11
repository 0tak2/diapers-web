import React, { useState, useEffect }  from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { getAllLogsForPeriodRequest } from '../modules/logs';
import { getCntRequest } from '../modules/cnts';

import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, Theme } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';

import PeriodControl from '../components/PeriodControl';
import ReportView from '../components/ReportView';

import { timeNowHelper, timeBeforeAWeekHelper } from '../utils/dateUtil';

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
    }
  }));

function ReportContainer({ match }: RouteComponentProps<MatchParams>) {
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
    const cnt = useSelector((state: RootState) => state.cnts.cnt);
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
        if (cntId) dispatch(getCntRequest({ cntId }));
    }, [cntId])

    useEffect(() => {
        if (cntId) dispatch(getAllLogsForPeriodRequest({ cntId, start: periodState.start, end: periodState.end }));
    }, [cntId, periodState])

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
                    {matchedLogsBunch(cntId) && cnt ?
                        <ReportView
                                logs={matchedLogsBunch(cntId).logs.reverse()} 
                                cnt={cnt} />
                        : ""}
                </>
            }
            {loading ? <div className={classes.backdrop}><CircularProgress /></div> : ""}
        </>
       
    )
}

export default ReportContainer;