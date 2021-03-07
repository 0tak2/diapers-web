import React from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles({
    list: {
      width: 250,
    }
});

const links = [
    {
        label: "메인",
        to: "/"
    },
    {
        label: "재고 현황",
        to: "/log"
    },
    {
        label: "통계 요약",
        to: "/summary"
    },
    {
        label: "보고서 작성",
        to: "/report"
    },
    {
        label: "관리자 메뉴",
        to: "/admin"
    },
    {
        label: "서비스 소개",
        to: "/about"
    },
]

// withRouter가 타입스크립트에서 지원이 되지 않아,
// withRouter로 감싸면 자동으로 history가 넘어오게 되는데도 오류가 발생하는 문제가 있다.
// 따라서 어쩔 수 없이 임시방편으로 props를 any로 지정했다.
/*
type DrawerContentsProps = {
    toggleDrawer: () => void;
    history: History
}
*/

function DrawerContents(props: any) {
    const { toggleDrawer, history } = props;

    const classes = useStyles();

    return (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer}
            >
            여기에 로그인 관련 컴포넌트가 위치합니다.
            <Divider />
            <List>
                {
                    links.map((link, index) => (
                        <ListItem button key={index}>
                            <ListItemText primary={link.label} onClick={() => history.push(link.to)} />
                        </ListItem>
                    ))
                }
            </List>
        </div>
    );
}

export default withRouter(DrawerContents);