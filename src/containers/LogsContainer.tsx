//스크롤 구현 필요!!
import React, { useEffect }  from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { getLogsRequest } from '../modules/logs';

import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, Theme } from '@material-ui/core/styles';

import LogsSheet from '../components/LogsSheet';

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

    const classes = useStyles();

    // redux store
    const loading = useSelector((state: RootState) => state.logs.loading);
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
            if (logsBunch.cntId === cntId) bunch = logsBunch;
        })
        return bunch;
    }

    // effect
    useEffect(() => {
        dispatch(getLogsRequest({ cntId, page: 0, size: 10 }));
    }, [cntId])

    return (
        <>
            {logsBunches ? <LogsSheet bunch={matchedLogsBunch(cntId)}></LogsSheet> : ""}
            {loading ? <div className={classes.backdrop}><CircularProgress /></div> : ""}
        </>
       
    )
}

export default LogsContainer;