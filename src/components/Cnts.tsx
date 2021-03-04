import React from 'react';
import Cnt from './Cnt';

const cntsData = [
    {
        name: "오상윤",
        cntId: "risiiskskaa",
        birth: "2000-01-01",
        recentLog: {
            cnt: "risiiskskaa",
            time: "2021-03-01 09:23",
            inner_opened: 1,
            inner_new: 8,
            outer_opened: 1,
            outer_new: 8,
            comment: "겉기저귀 낱개 3개"
        }
    },
    {
        name: "김민혁",
        cntId: "risiiskskaa",
        birth: "2000-01-01",
        recentLog: {
            cnt: "risiiskskaa",
            time: "2021-03-01 09:23",
            inner_opened: 1,
            inner_new: 8,
            outer_opened: 1,
            outer_new: 8,
            comment: "겉기저귀 낱개 3개"
        }
    },
    {
        name: "정재덕",
        cntId: "risiiskskaa",
        birth: "2000-01-01",
        recentLog: {
            cnt: "risiiskskaa",
            time: "2021-03-01 09:23",
            inner_opened: 1,
            inner_new: 8,
            outer_opened: 1,
            outer_new: 8,
            comment: "겉기저귀 낱개 3개"
        }
    },
    {
        name: "김명규",
        cntId: "risiiskskaa",
        birth: "2000-01-01",
        recentLog: {
            cnt: "risiiskskaa",
            time: "2021-03-01 09:23",
            inner_opened: 1,
            inner_new: 8,
            outer_opened: 1,
            outer_new: 8,
            comment: "겉기저귀 낱개 3개"
        }
    },
    {
        name: "김범준",
        cntId: "risiiskskaa",
        birth: "2000-01-01",
        recentLog: {
            cnt: "risiiskskaa",
            time: "2021-03-01 09:23",
            inner_opened: 1,
            inner_new: 8,
            outer_opened: 1,
            outer_new: 8,
            comment: "겉기저귀 낱개 3개"
        }
    },
    {
        name: "석재훈",
        cntId: "risiiskskaa",
        birth: "2000-01-01",
        recentLog: {
            cnt: "risiiskskaa",
            time: "2021-03-01 09:23",
            inner_opened: 1,
            inner_new: 8,
            outer_opened: 1,
            outer_new: 8,
            comment: "겉기저귀 낱개 3개"
        }
    },
];

function Cnts() {
    const cntsDataCensored = cntsData.map((cnt) => ({
        ...cnt,
        name: cnt.name.slice(0, 1) + "*" + cnt.name.slice(2, cnt.name.length)
    }))

    return (
        <>
            {cntsDataCensored.map((cnt, index) => 
                (<Cnt 
                    name={cnt.name} birth={cnt.birth} inner_opened={cnt.recentLog.inner_opened} inner_new={cnt.recentLog.inner_new}
                    outer_opened={cnt.recentLog.outer_opened} outer_new={cnt.recentLog.outer_new} logAt={cnt.recentLog.time} key={index} />)
            )}
        </>
       
    )
}

export default Cnts;