import React from 'react';
import Wrapper from '../wrappers/Wrapper';
import { Container, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import LoginCheck from '../containers/LoginCheck'
import CntCardsContainer from '../containers/CntCardsContainer';

const useStyles = makeStyles((theme: Theme) => ({
    title: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
}));

function Main() {
    const classes = useStyles();

    return (
        <Wrapper>
            <LoginCheck>
                <Container maxWidth="lg">
                    <div className={classes.title}>
                        <Typography variant="h3" component="h1">모아보기</Typography>
                    </div>
                    <CntCardsContainer />
                </Container>
            </LoginCheck>
        </Wrapper>
    );
}

export default Main;