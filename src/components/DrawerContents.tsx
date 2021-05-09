import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import LoginPanelContainer from '../containers/LoginPanelContainer';

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
        label: "보고서",
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

function DrawerContents(props: any) {
    const { toggleDrawer } = props;

    const classes = useStyles();

    return (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer}
            >
            <LoginPanelContainer />
            <List>
                {
                    links.map((link, index) => (
                        link.to === "/admin" ?
                        <ListItem button key={index} component="a" href={link.to} target="_blank">
                            <ListItemText primary={link.label}  />
                        </ListItem> :
                        <ListItem button key={index} component={Link} to={link.to}>
                            <ListItemText primary={link.label}  />
                        </ListItem>
                    ))
                }
            </List>
        </div>
    );
}

export default DrawerContents;