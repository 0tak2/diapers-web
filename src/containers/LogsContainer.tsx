import React, { useState, useEffect }  from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { getLogsRequest, postLogRequest } from '../modules/logs';
import { PostLogPayload } from '../api/logs';

import CircularProgress from '@material-ui/core/CircularProgress';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';

import LogsSheet from '../components/LogsSheet';
import LogPostControl from '../components/LogPostControl';

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
    }
  }));

function LogsContainer({ match }: RouteComponentProps<MatchParams>) {
    const { cntId } = match.params;

    // local state
    const [ page, setPage ] = useState(0);
    const [ logsPerPage, setLogsPerPage ] = useState(10);

    const classes = useStyles();

    // redux store
    const loading = useSelector((state: RootState) => state.logs.loading);
    const error = useSelector((state: RootState) => state.logs.error);
    const changed = useSelector((state: RootState) => state.logs.changed);
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
        dispatch(getLogsRequest({ cntId, page: 0, size: logsPerPage }));
    }, [cntId])

    useEffect(() => {
        dispatch(getLogsRequest({ cntId, page: page, size: logsPerPage }));
    }, [page, logsPerPage])

    useEffect(() => {
        if (changed) dispatch(getLogsRequest({ cntId, page: page, size: logsPerPage }));
    }, [changed])

    const isAnythingNegative = (vals: number[]) => {
        vals.forEach((val) => {
            if (val < 0) return true;
        })
        return false;
    }

    const onSubmit = (payload: PostLogPayload) => { // LogControl에서 submit 되었을 때
        const { inner_new, inner_opened, outer_new, outer_opened } = payload;
        const vals = new Array(inner_new, inner_opened, outer_new, outer_opened);
        isAnythingNegative(vals) ? alert("음수는 입력할 수 없습니다.") : dispatch(postLogRequest(payload));
    }

    const handleChangeRequestPage = (newPage: number) => {
        setPage(newPage);
    }

    const handleChangeLogsPerPage = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setLogsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    }

    return (
        <>
            {error ?
                <MuiAlert severity="error">
                    오류가 발생했습니다. 문제가 반복되면 관리자에게 문의하세요.<br />
                    {error.toString()}
                </MuiAlert>
            : ""}
            {logsBunches ?
                <>
                    <LogPostControl bunch={matchedLogsBunch(cntId)} onSubmit={onSubmit} error={error}/>
                    <LogsSheet
                        bunch={matchedLogsBunch(cntId)}
                        page={page}
                        logsPerPage={logsPerPage}
                        onChangeRequestPage={handleChangeRequestPage}
                        onChangeLogsPerPage={handleChangeLogsPerPage} />
                </>
            : ""}
            {loading ? <div className={classes.backdrop}><CircularProgress /></div> : ""}
        </>
       
    )
}

export default LogsContainer;