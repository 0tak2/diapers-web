import React from 'react';
import { Route } from 'react-router-dom';
import Wrapper from '../wrappers/Wrapper';
import LoginCheck from '../containers/LoginCheck'
import { Container, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import SummaryContainer from '../containers/SummaryContainer'
import CntButtonsContainer from '../containers/CntButtonsContainer'
import CntDetailContainer from '../containers/CntDetailContainer'

const useStyles = makeStyles((theme: Theme) => ({
    title: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
}));

function Summary() {
    const classes = useStyles();

    return (
        <Wrapper>
            <LoginCheck>
                <Container maxWidth="lg">
                    <div className={classes.title}>
                        <Typography variant="h3" component="h1">통계 요약</Typography>
                    </div>
                    <CntButtonsContainer baseUri={"/summary"}/>
                    <Route
                        path="/summary"
                        exact
                        render={() => <Typography variant="body2">조회할 이용자를 선택해주십시오.</Typography>}
                    />
                    <Route
                        path="/summary/:cntId"
                        component={CntDetailContainer}
                    />
                    <Route
                        path="/summary/:cntId"
                        component={SummaryContainer}
                    />
                </Container>
            </LoginCheck>
        </Wrapper>
    );
}

export default Summary;