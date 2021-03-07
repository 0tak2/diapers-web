import React from 'react';
import Wrapper from '../wrappers/Wrapper';
import { Container, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Cnts from '../components/Cnts';

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
            <Container maxWidth="lg">
                <div className={classes.title}>
                    <Typography variant="h3" component="h1">메인</Typography>
                </div>
                <Cnts />
            </Container>
        </Wrapper>
    );
}

export default Main;