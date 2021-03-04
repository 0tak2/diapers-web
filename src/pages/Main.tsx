import React from 'react';
import Wrapper from '../wrappers/Wrapper';
import { Container } from '@material-ui/core';
import Cnts from '../components/Cnts';


function Main() {
    return (
        <Wrapper>
            <Container maxWidth="lg">
                <div>
                    <h1>메인</h1>
                </div>
                <Cnts />
            </Container>
        </Wrapper>
    );
}

export default Main;