import React, { useRef, useEffect }  from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { getLogRequest, patchLogRequest, delLogRequest } from '../modules/logs';
import { PatchLogPayload } from '../api/logs';

import { makeStyles, Theme } from '@material-ui/core/styles';

import LogEditControl from '../components/LogEditControl';

interface MatchParams {
    cntId: string;
    logId: string;
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
    logEditControl: {
        maxWidth: '768px',
    }
  }));

function LogsContainer({ match, history }: RouteComponentProps<MatchParams>) {
    const { cntId, logId } = match.params;

    const classes = useStyles();

    const modalWrapperEl = useRef<HTMLDivElement>(null);

    // redux store
    const loading = useSelector((state: RootState) => state.logs.loading);
    const error = useSelector((state: RootState) => state.logs.error);
    const changed = useSelector((state: RootState) => state.logs.changed);
    const log = useSelector((state: RootState) => state.logs.log);
    const dispatch = useDispatch();

    // effect
    useEffect(() => {
        dispatch(getLogRequest({ logId }));
    }, [cntId])

    useEffect(() => {
        if (changed) {
            alert('수정되었습니다.');
            history.push(`/log/${cntId}`);
        }
    }, [changed])

    const isAnythingNegative = (vals: (number | null)[]) => {
        vals.forEach((val) => {
            if (val) if (val < 0) return true;
        })
        return false;
    }

    const onSubmit = (payload: PatchLogPayload) => { // LogControl에서 submit 되었을 때
        const { inner_new, inner_opened, outer_new, outer_opened } = payload;
        const vals = new Array(inner_new, inner_opened, outer_new, outer_opened);
        isAnythingNegative(vals) ? alert("음수는 입력할 수 없습니다.") : dispatch(patchLogRequest(payload));
    }

    const onDelete = () => {
        if (window.confirm("정말로 삭제하시겠습니까?")) {
            dispatch(delLogRequest({ logId }))
        } else {
            return
        }
    }

    const onClickBackground = (e: any) => {
        if (!modalWrapperEl.current?.contains(e.target)) history.push(`/log/${cntId}`);
    }

    return (
        <>
            {
                loading ?
                "" :
                <div className={classes.backdrop} onClick={onClickBackground}>
                    <div ref={modalWrapperEl} className={classes.logEditControl}>
                        <LogEditControl logId={logId} log={log} onSubmit={onSubmit} onDelete={onDelete} error={error} />
                    </div>
                </div>
            }
        </>
       
    )
}

export default withRouter(LogsContainer);