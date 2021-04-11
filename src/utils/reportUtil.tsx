import { Document, Packer, Paragraph, HeadingLevel,
                WidthType, Table, TableRow, TableCell, AlignmentType, TextRun } from 'docx';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

import { LogType } from '../api/logs';
import { CntType } from '../api/cnts';

import { dateHelper, timeNowHelper } from './dateUtil';
import { censorCntName } from './censorUtil';

export const makeDocxReport = (logs: LogType[], cnt: CntType) => {
    const tableRows = [
        new TableRow({
            children: [
                new TableCell({
                    width: {
                        size: 3800,
                        type: WidthType.DXA,
                    },
                    children: [new Paragraph("기준 시간")],
                }),
                new TableCell({
                    width: {
                        size: 3800,
                        type: WidthType.DXA,
                    },
                    children: [new Paragraph("겉 기저귀 (개봉 팩)")],
                }),
                new TableCell({
                    width: {
                        size: 3800,
                        type: WidthType.DXA,
                    },
                    children: [new Paragraph("겉 기저귀 (미개봉 팩)")],
                }),
                new TableCell({
                    width: {
                        size: 3800,
                        type: WidthType.DXA,
                    },
                    children: [new Paragraph("속 기저귀 (개봉 팩)")],
                }),
                new TableCell({
                    width: {
                        size: 3800,
                        type: WidthType.DXA,
                    },
                    children: [new Paragraph("속 기저귀 (미개봉 팩)")],
                }),
                new TableCell({
                    width: {
                        size: 5505,
                        type: WidthType.DXA,
                    },
                    children: [new Paragraph("비고")],
                }),
                new TableCell({
                    width: {
                        size: 3800,
                        type: WidthType.DXA,
                    },
                    children: [new Paragraph("작성자")],
                }),
                new TableCell({
                    width: {
                        size: 3800,
                        type: WidthType.DXA,
                    },
                    children: [new Paragraph("수정자")],
                }),
            ],
        })
    ].concat(
        logs.map((log) => {
            return new TableRow({
                children: [
                    new TableCell({
                        width: {
                            size: 3800,
                            type: WidthType.DXA,
                        },
                        children: [new Paragraph(dateHelper(log.time, true))],
                    }),
                    new TableCell({
                        width: {
                            size: 3800,
                            type: WidthType.DXA,
                        },
                        children: [new Paragraph({
                            text: String(log.outer_opened),
                            alignment: AlignmentType.CENTER
                        })],
                    }),
                    new TableCell({
                        width: {
                            size: 3800,
                            type: WidthType.DXA,
                        },
                        children: [new Paragraph({
                            text: String(log.outer_new),
                            alignment: AlignmentType.CENTER
                        })],
                    }),
                    new TableCell({
                        width: {
                            size: 3800,
                            type: WidthType.DXA,
                        },
                        children: [new Paragraph({
                            text: String(log.inner_opened),
                            alignment: AlignmentType.CENTER
                        })],
                    }),
                    new TableCell({
                        width: {
                            size: 3800,
                            type: WidthType.DXA,
                        },
                        children: [new Paragraph({
                            text: String(log.inner_new),
                            alignment: AlignmentType.CENTER
                        })],
                    }),
                    new TableCell({
                        width: {
                            size: 5505,
                            type: WidthType.DXA,
                        },
                        children: [new Paragraph(log.comment)],
                    }),
                    new TableCell({
                        width: {
                            size: 3800,
                            type: WidthType.DXA,
                        },
                        children: [new Paragraph(log.created_by)],
                    }),
                    new TableCell({
                        width: {
                            size: 3800,
                            type: WidthType.DXA,
                        },
                        children: [new Paragraph(log.modified_by)],
                    }),
                ],
            });
        })
    );

    const table = new Table({
            rows: tableRows
    });

    const doc = new Document({
        sections: [{
            properties: {},
            children: [
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "이용자(거주인)별 기저귀 재고 기록",
                            bold: true,
                            color: "000000"
                        })
                    ],
                    heading: HeadingLevel.HEADING_1,
                    alignment: AlignmentType.CENTER,
                }),
                new Paragraph({
                    text: `대상 이용자(거주인): ${censorCntName(cnt.name)}`,
                    bullet: {
                        level: 0
                    }
                }),
                new Paragraph({
                    text: `대상 기간: ${dateHelper(logs[logs.length - 1].time)} ~ ${dateHelper(logs[0].time)}`,
                    bullet: {
                        level: 0
                    }
                }),
                new Paragraph(""),
                table
            ]
        }
        ]
    })

    Packer.toBlob(doc).then((blob) => {
        saveAs(blob, `${censorCntName(cnt.name)}-${timeNowHelper()}.docx`);
    });
}

export const makeXlsxReport = (logs: LogType[], cnt: CntType) => {
    let wb = XLSX.utils.book_new();

    const sheetName = `${censorCntName(cnt.name)} 기저귀 재고 기록`.replace('*', '○');
    wb.SheetNames.push(sheetName);

    const wsData = [
        ['이용자(거주인)별 기저귀 재고 기록'],
        [`대상 이용자(거주인): ${censorCntName(cnt.name)}`],
        [`대상 기간: ${dateHelper(logs[logs.length - 1].time)} ~ ${dateHelper(logs[0].time)}`],
        [''],
        ['기준 시간', '겉 기저귀 (개봉 팩)', '겉 기저귀 (미개봉 팩)', '속 기저귀 (개봉 팩)', '속 기저귀 (미개봉 팩)', '비고', '작성자', '수정자']
    ].concat(logs.map((log) => {
        return [dateHelper(log.time, true), String(log.outer_opened), String(log.outer_new), String(log.inner_opened), String(log.inner_new), log.comment, log.created_by, log.modified_by];
    }))

    const worksheet = XLSX.utils.aoa_to_sheet(wsData);

    wb.Sheets[sheetName] = worksheet;

    XLSX.writeFile(wb, `${censorCntName(cnt.name)}-${timeNowHelper()}.xlsx`);
}