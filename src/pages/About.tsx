import React from 'react';
import Wrapper from '../wrappers/Wrapper';
import { Container, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
    title: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    passage: {
        marginBottom: theme.spacing(1.5)
    }
}));

type PProps = {
    children: React.ReactNode;
}

function P({ children }: PProps) {
    const classes = useStyles();

    return (
        <Typography variant="body1" className={classes.passage}>
            {children}
        </Typography>)
}

function About() {
    const classes = useStyles();

    return (
        <Wrapper>
            <Container maxWidth="lg">
                <div className={classes.title}>
                    <Typography variant="h3" component="h1">서비스 소개</Typography>
                </div>
                <div>
                    <img src="./diapers-logo.png" alt="A logo of the service."></img>
                    <P>
                        다이퍼스 DIAPERS는 소규모 사회복지시설에서의 효율적인 기저귀 재고 관리를 위한 솔루션입니다.
                    </P>
                    <P>
                        중증장애인단기보호시설 한벗둥지의 사회복무요원인 저희 임영택, 차민우는 이용자의 기저귀
                        재고 관리 업무를 담당하고 있습니다. 기저귀 재고 수량 파악이 제대로 되지 않으면,
                        사용 가능한 기저귀 재고가 모두 소진되었음도 이를 사전에 인지하지 못하여 이용자의
                        기저귀 교체에 차질이 생기는 경우가 발생하게 됩니다. 따라서 이 작업은 사소해보이지만
                        이용자의 삶의 질 향상과 건강 관리에 있어 중요한 작업 중 하나라고 할 수 있습니다.
                    </P>
                    <P>
                        그러나 저희는 곧 서류 기반 재고 관리의 한계를 체감하고 문제 해결을 위해 머리를 맞대게
                        되었습니다. 기존의 기저귀 재고 관리는 기저귀 수납 장소 근처에 부착된 기록표에 재고를
                        수기로 기록하는 방식으로 이뤄지고 있었습니다. 이러한 방식은 ▲기저귀 입/출고 빈도와 규모를
                        추적하기 어렵다는 점, ▲기저귀 재고 상태에 대한 기록은 아카이브 중요도가 떨어짐에도 불구하고
                        기록물을 계속해 생산 할 수밖에 없다는 점, 또한 결정적으로 ▲재고 파악시마다 기록지를 파일에서
                        빼네어 수기로 기록해야 하므로 번거롭고 귀찮아 재고 파악이 제때 이뤄지지 않는 경우가
                        빈번하다는 점 등 여러 단점을 가지고 있었습니다.
                    </P>
                    <P>
                        이에 이러한 단점을 극복하고 효율적으로 기저귀 재고를 관리하기 위해 저희는 기저귀 재고 데이터를
                        직렬화하여 데이터베이스에 기록하는 솔루션인 다이퍼스 DIAPERS를 구상하고 개발하게 되었습니다.
                        다이퍼스는 기저귀 재고를 편리하게 기록하는 새로운 방식을 제공하며, 저장된 데이터를 빠르고 정확히
                        보여주고, 축적된 데이터에 대한 간단한 통계 기능과, 데이터를 기록물로서 보존할 수 있도록 보고서
                        작성 기능을 추가적으로 제공합니다.
                    </P>
                    <P>
                        저희가 한벗둥지에서 경험했던 것처럼, 소규모 사회복지시설에는 아직도 전산화되지 못하여 가치는 있지만
                        활용할 수는 없는 불가용 데이터가 많을 것입니다.  사회복무요원이라는 제한된 위치에서, 모든 데이터를
                        전산화하고 체계적으로 활용할 수 있도록 조치할 수는 없지만, 저희의 작은 노력이 사회복지시설의 효율적인
                        운영과 사회의 엄연한 구성원인 사회복지시설 이용자들의 삶에 질 향상에 있어 작게나마 도움이 되기를 바랄
                        뿐입니다.
                    </P>
                    <P>
                        2021년 3월<br />
                        임영택, 차민우
                    </P>
                </div>
            </Container>
        </Wrapper>
    );
}

export default About;