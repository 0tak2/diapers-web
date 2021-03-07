import React from 'react';
import Wrapper from '../wrappers/Wrapper';
import { Container, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
    title: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
}));

function Log() {
    const classes = useStyles();

    return (
        <Wrapper>
            <Container maxWidth="lg">
                <div className={classes.title}>
                    <Typography variant="h3" component="h1">재고 상황</Typography>
                </div>
                {/*여기에 컴포넌트가 들어가면 됩니다.*/}
            </Container>
        </Wrapper>
    );
}

export default Log;