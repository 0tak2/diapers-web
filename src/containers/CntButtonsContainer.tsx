import React, { useEffect }  from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { getCntsPageRequest } from '../modules/cnts';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';

import { censorCntName } from '../utils/censorUtil';

const sizePerPage = 4;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

function CntCardsContainer() {
    const classes = useStyles();

    // redux store
    const cnts = useSelector((state: RootState) => state.cnts.cnts);
    const page = useSelector((state: RootState) => state.cnts.page);
    const last = useSelector((state: RootState) => state.cnts.last);
    const loading = useSelector((state: RootState) => state.cnts.loading);
    const dispatch = useDispatch();

    // effect
    useEffect(() => {
        dispatch(getCntsPageRequest({ page: 0, size: sizePerPage }));
    }, [])

    // pagination
    const onClickPrev = () => {
        if (page !== null) dispatch(getCntsPageRequest({ page: page - 1, size: sizePerPage }));
    }

    const onClickNext = () => {
        if (page !== null) dispatch(getCntsPageRequest({ page: page + 1, size: sizePerPage }));
    }

    return (
        <>
            <div className={classes.root}>
                {
                    loading ?
                    <ButtonGroup color="primary" aria-label="outlined primary button group" disabled>
                        {page && page > 0 ? <Button onClick={onClickPrev}>&lt;</Button> : ""}
                        {cnts ? cnts.map((cnt, index) => 
                        (<Button key={index} component={RouterLink} to={`/log/${cnt.id}`}>{censorCntName(cnt.name)}</Button>)) : ""}
                        {!last ? <Button onClick={onClickNext}>&gt;</Button> : ""}
                    </ButtonGroup> :
                    <ButtonGroup color="primary" aria-label="outlined primary button group">
                        {page && page > 0 ? <Button onClick={onClickPrev}>&lt;</Button> : ""}
                        {cnts ? cnts.map((cnt, index) => 
                        (<Button key={index} component={RouterLink} to={`/log/${cnt.id}`}>{censorCntName(cnt.name)}</Button>)) : ""}
                        {!last ? <Button onClick={onClickNext}>&gt;</Button> : ""}
                    </ButtonGroup>
                }

            </div>
        </>
       
    )
}

export default CntCardsContainer;