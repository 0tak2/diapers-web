import React from 'react';
import Wrapper from '../wrappers/Wrapper';
import LoginCheck from '../containers/LoginCheck'
import { Container, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
    title: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
}));

function Admin() {
    const classes = useStyles();

    return (
        <Wrapper>
            <LoginCheck>
                <Container maxWidth="lg">
                    <div className={classes.title}>
                        <Typography variant="h3" component="h1">관리자 메뉴</Typography>
                    </div>
                    {/*여기에 컴포넌트가 들어가면 됩니다.*/}
                </Container>
            </LoginCheck>
        </Wrapper>
    );
}

export default Admin;