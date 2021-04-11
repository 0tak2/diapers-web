import React, { useRef } from 'react';

import { LogType } from '../api/logs';
import { CntType } from '../api/cnts';

import { Paper, Typography, ButtonGroup, Button } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { dateHelper } from '../utils/dateUtil';
import { censorCntName } from '../utils/censorUtil';
import { makeDocxReport, makeXlsxReport } from '../utils/reportUtil';

interface ReportViewProps {
    logs: LogType[];
    cnt: CntType;
}

const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        margin: theme.spacing(1),
        padding: theme.spacing(6)
    },
    title: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    table: {
        textAlign: "center",
        width: "100%",
        border: "1px solid #444444",
        borderCollapse: "collapse",
    },
    cell: {
        border: "1px solid #444444",
    },
    buttonsWrapper: {
        marginTop: theme.spacing(3),
        textAlign: "right", 
    }
}));

function ReportView({ logs, cnt }: ReportViewProps) {
    const classes = useStyles();

    const reportArea = useRef<HTMLDivElement>(null);

    const onClickPrint = () => {
        if(reportArea.current) {
            const font = '<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&amp;family=Roboto:wght@300;400;500;700&amp;display=swap" rel="stylesheet">'
            const style = `
            <style>
                body {
                    font-family: Noto Sans KR;
                }
                h1 {
                    text-align: center;
                }
                table {
                    width: 100%;
                    text-align: center;
                    border: 1px solid #444444;
                    border-collapse: collapse;
                }
                th, td {
                    border: 1px solid #444444;
                }
            </style>
            `;
            const script = `
                <script>
                    window.onload = function() {
                        window.print()
                    }
                </script>
            `;
            const body = `<body>${reportArea.current.outerHTML}</body>`;
            const html = '\ufeff' + font + style + body + script;
            const blob = new Blob([html], {type: 'text/html'});
            const blobUrl = window.URL.createObjectURL(blob);
            window.open(blobUrl)
        }
    }

    const onClickDocx = () => {
        makeDocxReport(logs, cnt);
    }

    const onClickXlsx = () => {
        makeXlsxReport(logs, cnt);
    }

    return (
        <>
            <div className={classes.buttonsWrapper}>
                <ButtonGroup color="primary" aria-label="보고서 내보내기">
                    <Button onClick={onClickPrint}>프린트</Button>
                    <Button onClick={onClickDocx}>워드 파일</Button>
                    <Button onClick={onClickXlsx}>엑셀 파일</Button>
                </ButtonGroup>
            </div>
            <Paper elevation={3} className={classes.paper}>
                <div ref={reportArea}>
                    <Typography variant="h4" component="h1" align="center">이용자(거주인)별 기저귀 재고 기록</Typography>
                    <Typography variant="body1">
                        <ul>
                            <li>대상 이용자(거주인): {censorCntName(cnt.name)}({dateHelper(cnt.birth, false)})</li>
                            <li>대상 기간: {dateHelper(logs[logs.length - 1].time, false)} ~ {dateHelper(logs[0].time, false)}</li>
                        </ul>
                    </Typography>
                    <table className={classes.table}>
                        <tr>
                            <th className={classes.cell}>기준 시간</th>
                            <th className={classes.cell}>겉 기저귀 (개봉 팩)</th>
                            <th className={classes.cell}>겉 기저귀 (미개봉 팩)</th>
                            <th className={classes.cell}>속 기저귀 (개봉 팩)</th>
                            <th className={classes.cell}>속 기저귀 (미개봉 팩)</th>
                            <th className={classes.cell}>비고</th>
                            <th className={classes.cell}>작성자</th>
                            <th className={classes.cell}>수정자</th>
                        </tr>
                        {logs.map((log, index)=>
                            <tr key={index}>
                                <td className={classes.cell}>{dateHelper(log.time, true)}</td>
                                <td className={classes.cell}>{log.outer_opened}</td>
                                <td className={classes.cell}>{log.outer_new}</td>
                                <td className={classes.cell}>{log.inner_opened}</td>
                                <td className={classes.cell}>{log.inner_new}</td>
                                <td className={classes.cell}>{log.comment}</td>
                                <td className={classes.cell}>{log.created_by}</td>
                                <td className={classes.cell}>{log.modified_by}</td>
                            </tr>
                        )}
                    </table>
                </div>
            </Paper>
        </>
    );
}

export default ReportView;