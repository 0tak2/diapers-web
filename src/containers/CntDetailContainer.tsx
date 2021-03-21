import React, { useEffect }  from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { getCntRequest } from '../modules/cnts';

import CntDetail from '../components/CntDetail';

import { dateHelper } from '../utils/dateUtil';
import { censorCntName } from '../utils/censorUtil';

interface MatchParams {
    cntId: string;
}

function CntDetailContainer({ match }: RouteComponentProps<MatchParams>) {
    const { cntId } = match.params;

    // redux store
    const cnt = useSelector((state: RootState) => state.cnts.cnt);
    const dispatch = useDispatch();

    // effect
    useEffect(() => {
        dispatch(getCntRequest({ cntId }));
    }, [cntId])

    return (
        <>
            {cnt ? <CntDetail cntId={cntId} name={censorCntName(cnt.name)} birth={dateHelper(cnt.birth)} description={cnt.description}
            outer_product={cnt.outer_product} inner_product={cnt.inner_product} deactivated={cnt.deactivated} /> : ""}
        </>
       
    )
}

export default withRouter(CntDetailContainer);