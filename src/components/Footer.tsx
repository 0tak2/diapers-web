import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
    footer: {
        padding: theme.spacing(6),
    },
}));

function Footer() {
    const classes = useStyles();

    return (
        <div className={classes.footer}>
            <Typography variant="body2" color="textSecondary" align="center">
                기저귀 관리 시스템 DIAPERS<br />
                diapers-web v0.01<br />
                한벗둥지 사회복무요원 임영택 (2020-2021), 차민우 (2020-2022)
            </Typography>
        </div>
    );
  }

  export default Footer;