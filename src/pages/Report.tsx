import React from 'react';
import { Route } from 'react-router-dom';
import Wrapper from '../wrappers/Wrapper';
import LoginCheck from '../containers/LoginCheck'
import { Container, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

import CntButtonsContainer from '../containers/CntButtonsContainer';
import ReportContainer from '../containers/ReportContainer';

const useStyles = makeStyles((theme: Theme) => ({
    title: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
}));

function Report() {
    const classes = useStyles();

    return (
        <Wrapper>
            <LoginCheck>
                <Container maxWidth="lg">
                    <div className={classes.title}>
                        <Typography variant="h3" component="h1">보고서</Typography>
                    </div>
                    <CntButtonsContainer baseUri={"/report"}/>
                    <Route
                        path="/report"
                        exact
                        render={() => <Typography variant="body2">조회할 이용자를 선택해주십시오.</Typography>}
                    />
                    <Route
                        path="/report/:cntId"
                        component={ReportContainer}
                    />
                </Container>
            </LoginCheck>
        </Wrapper>
    );
}

export default Report;