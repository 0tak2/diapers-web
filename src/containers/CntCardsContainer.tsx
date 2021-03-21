//스크롤 구현 필요!! useRef
import React, { useEffect }  from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { getCntsPageAndRecentLogRequest } from '../modules/cnts';

import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, Theme } from '@material-ui/core/styles';

import CntCard from '../components/CntCard';

import { dateHelper } from '../utils/dateUtil';
import { censorCntName } from '../utils/censorUtil';

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

function CntCardsContainer() {
    const classes = useStyles();

    // redux store
    const loading = useSelector((state: RootState) => state.cnts.loading);
    const cnts = useSelector((state: RootState) => state.cnts.cnts);
    const logsBunches = useSelector((state: RootState) => state.logs.logsBunches);
    const dispatch = useDispatch();

    const matchedLog = (cntId: string) => {
        let log = {
            time: '',
            inner_opened: 0,
            inner_new: 0,
            outer_opened: 0,
            outer_new: 0,
            comment: '',
            id: '',
            cnt: '',
            created_by: '',
            modified_by:  '',
        };
        logsBunches.forEach((logsBunch) => {
            if (logsBunch.cntId === cntId) log=logsBunch.logs[0];
        })
        return log;
    }

    // effect
    useEffect(() => {
        dispatch(getCntsPageAndRecentLogRequest({ page: 0, size: 10 }));
    }, [])

    return (
        <>
            {cnts ? cnts.map((cnt, index) => 
                (<CntCard 
                    cntId={cnt.id} name={censorCntName(cnt.name)} birth={dateHelper(cnt.birth)} inner_opened={matchedLog(cnt.id).inner_opened} inner_new={matchedLog(cnt.id).inner_new}
                    outer_opened={matchedLog(cnt.id).outer_opened} outer_new={matchedLog(cnt.id).outer_new} comment={matchedLog(cnt.id).comment} logAt={dateHelper(matchedLog(cnt.id).time, true)} key={index} />)
            ) : ""}
            
            {loading ? <div className={classes.backdrop}><CircularProgress /></div> : ""}
        </>
       
    )
}

export default CntCardsContainer;