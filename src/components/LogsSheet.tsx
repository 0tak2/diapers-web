import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton  from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

import SheetPagination from './SheetPagination';

import { LogType } from '../api/logs';
import { dateHelper } from '../utils/dateUtil';

interface LogsBunch {
    cntId: string;
    logs: LogType[];
    page: number;
    size: number;
    last: boolean;
}

interface LogsSheetProps {
    bunch: LogsBunch;
    page: number;
    logsPerPage: number;
    onChangeRequestPage: (newPage: number) => void;
    onChangeLogsPerPage: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
  });

function LogsSheet({ bunch, page, logsPerPage, onChangeRequestPage, onChangeLogsPerPage }: LogsSheetProps) {
    const classes = useStyles();

    return (
        <>
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="기저귀 재고 데이터 시트">
                <TableHead>
                    <TableRow>
                        <TableCell>기준 시간</TableCell>
                        <TableCell>겉 기저귀 (개봉 팩)</TableCell>
                        <TableCell>겉 기저귀 (미개봉 팩)</TableCell>
                        <TableCell>속 기저귀 (개봉 팩)</TableCell>
                        <TableCell>속 기저귀 (미개봉 팩)</TableCell>
                        <TableCell>비고</TableCell>
                        <TableCell>작성자</TableCell>
                        <TableCell>수정자</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {bunch.logs.map((log: LogType) => (
                    <TableRow key={log.id}>
                        <TableCell>{dateHelper(log.time, true)}</TableCell>
                        <TableCell>{log.outer_opened}</TableCell>
                        <TableCell>{log.outer_new}</TableCell>
                        <TableCell>{log.inner_opened}</TableCell>
                        <TableCell>{log.inner_new}</TableCell>
                        <TableCell>{log.comment}</TableCell>
                        <TableCell>{log.created_by}</TableCell>
                        <TableCell>{log.modified_by}</TableCell>
                        <TableCell>
                            <IconButton aria-label="edit or delete" size="small" component={RouterLink} to={`/log/${log.cnt}/${log.id}`}>
                                <EditIcon />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
        <SheetPagination
            rowsPerPageOptions={[10, 15, 20]}
            rowsPerPage={logsPerPage}
            page={page}
            isLast={bunch.last}
            onChangePage={onChangeRequestPage}
            onChangeRowsPerPage={onChangeLogsPerPage} />
        </>
    );
}

export default LogsSheet;