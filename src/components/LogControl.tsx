import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { LogType } from '../api/logs';

interface LogControlProps {
    bunch: any
}

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

function LogControl({ bunch }: LogControlProps) {
    const classes = useStyles();

    return (
        <div>무언가</div>
        // 추가 로드 버튼 구현
    );
}

export default LogControl;