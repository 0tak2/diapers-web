import React from 'react';
import Wrapper from '../wrappers/Wrapper';
import { Container } from '@material-ui/core';


function About() {
    return (
        <Wrapper>
            <Container maxWidth="lg">
                <div>
                    <h1>소개</h1>
                    <hr />
                    <p>이곳에는 간단한 소개와 버전 로그, 도움말이 제공됩니다.</p>
                </div>
            </Container>
        </Wrapper>
    );
}

export default About;