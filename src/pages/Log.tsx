import React from 'react';
import { Route } from 'react-router-dom';
import Wrapper from '../wrappers/Wrapper';
import LoginCheck from '../containers/LoginCheck'
import { Container, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

import CntButtonsContainer from '../containers/CntButtonsContainer';
import AdvancedSwitch from '../components/AdvacedSwitch';
import LogsContainer from '../containers/LogsContainer';
import CntDetailContainer from '../containers/CntDetailContainer';
import LogDetailContainer from '../containers/LogDetailContainer';

const useStyles = makeStyles((theme: Theme) => ({
    title: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    gridRoot: {
        flexGrow: 1,
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1)
    },
    rightWrapper: {
        textAlign: 'right',
    }
}));

function Log() {
    const classes = useStyles();

    return (
        <Wrapper>
            <LoginCheck>
                <Container maxWidth="lg">
                    <div className={classes.title}>
                        <Typography variant="h3" component="h1">재고 현황</Typography>
                    </div>
                    <CntButtonsContainer baseUri={"/log"}/>
                    <Route
                        path="/log/:cntId"
                        render={() => <div className={classes.rightWrapper}><AdvancedSwitch /></div>}
                    />
                    <Route
                        path="/log"
                        exact
                        render={() => <Typography variant="body2">조회할 이용자를 선택해주십시오.</Typography>}
                    />
                    <Route
                        path="/log/:cntId"
                        component={CntDetailContainer}
                    />
                   <Route
                        path="/log/:cntId"
                        component={LogsContainer}
                    />
                    <Route
                        path="/log/:cntId/:logId"
                        component={LogDetailContainer}
                    />
                </Container>
            </LoginCheck>
        </Wrapper>
    );
}

export default Log;