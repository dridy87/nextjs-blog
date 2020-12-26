import React, { Component, useState, useEffect } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts/highstock';
import * as utils from "../lib/utils";
import useSwr from 'swr'

const fetcher = (url) => fetch(url).then((res) => {
    return res.json()
})

export default function StockChart() {
    const [ohlc, setOhlc] = useState();
    const [option, setOption] = useState();
    const { data, error } = useSwr('/api/stock', fetcher, {
        onSuccess: (data) => {
            console.log(data)
            var ohlc = [],
                volume = [],
                dataLength = data[0].data.length,

                // set the allowed units for data grouping
                groupingUnits = [[
                    'week',                         // unit name
                    [1]                             // allowed multiples
                ], [
                    'month',
                    [1, 2, 3, 4, 6]
                ]],

                i = 0;

            for (var i = 0; i < dataLength; i += 1) {
                ohlc.push([
                    data[0].data[i].dt = data[0].data[i].dt.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')
                    , // the date
                    parseInt(data[0].data[i].open), // open
                    parseInt(data[0].data[i].high), // high
                    parseInt(data[0].data[i].low), // low
                    parseInt(data[0].data[i].close) // close
                ]);

                volume.push([
                    data[0].data[i].dt = data[0].data[i].dt.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'), // the date

                    parseInt(data[0].data[i].volume) // the volume
                ]);
            }

            options.series[0]['data'] = ohlc;
            options.series[0]['name'] = "GS";
            options.series[0]['dataGrouping'] = groupingUnits;
            options.series[1]['data'] = volume;
            options.series[1]['dataGrouping'] = groupingUnits;
            options.series[2]['data'] = []


            options.series[3]['data'] = utils.drawLine(data[0].data, 20);
            options.series[4]['data'] = utils.drawLine(data[0].data, 60);
            options.series[5]['data'] = utils.drawLine(data[0].data, 120);
            options.title.text = data[0].cname;

            setOption(options);

        }
    })

    // To avoid unnecessary update keep all options in the state.
    const options = {

        chart: {
            // styledMode: true

            height: 600
        },
        lang: {
            months: [
                '1월', '2월', '3월', '4월',
                'Mai', 'Juin', 'Juillet', 'Août',
                'Septembre', 'Octobre', 'Novembre', '12월'
            ],
            shortMonths: [
                'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
                'Aug', 'Sep', '10월', '11월', '12월'
            ],
            weekdays: [
                '일', '월', '화', '수', '목',
                '금', '토'
            ]
        },

        title: {
            text: ''
        },

        rangeSelector: {
            enabled: false
        },
        xAxis: {
            min: 200,
            max: 300,
            //range: 6 * 30 * 24 * 3600 * 1000, // six months
            // range: 1.5 * 360 * 24 * 3600000,
            // minRange: 0.5 * 360 * 24 * 3600000,
            // maxRange: 2.0 * 360 * 24 * 3600000,
            labels: {
                enabled: false
            },
            tickInterval: 1
        },
        yAxis: [{
            // labels: {
            //   align: 'right',
            //   x: -3
            // },
            // title: {
            //   text: ''
            // },
            height: '80%',
            //lineWidth: 1,
            resize: {
                enabled: true
            }
        }, {
            // labels: {
            //   align: 'right',
            //   x: -3
            // },
            // title: {
            //   text: ''
            // },
            top: '75%',
            height: '25%',
            offset: 0,
            lineWidth: 2
        }],
        navigator: {
            // enabled: false
            adaptToUpdatedData: false,
        },
        legend: {
            align: 'right',
            verticalAlign: 'top',
            layout: 'vertical',
            x: 0,
            y: 100
        },

        series: [
            {
                type: 'candlestick',
                id: 'dataseries',
                //name: 'AAPL Stock Price',
                tooltip: {

                    //split: true,
                    pointFormat: '<b>시가:</b> {point.open} {point.openChange}<br/>\n         <b>고가:</b> {point.high} {point.highChange}<br/>\n         <b>저가:</b> {point.low} {point.lowChange}<br/>\n         <b>종가:</b> <span style="color: {point.closeColor}"> {point.close} {point.closeChange}</span><br/>'
                },
                dataGrouping: {
                    enabled: false
                }
            },
            {
                type: 'column',
                name: 'Volume',

                yAxis: 1,
                tooltip: { pointFormat: "<b>거래량:</b> {point.y:,.0f}<br/>" },
                dataGrouping: {
                    enabled: false
                }

            },
            {
                type: 'flags',
                name: 'Flags on series',
                // data: [{
                //     x: 220,
                //     title: 'On series'
                // }, {
                //     x: 230,
                //     title: 'On series'
                // }],
                onSeries: 'dataseries',
                shape: 'squarepin',
                //color: Highcharts.getOptions().colors[2], // same as onSeries
                fillColor: '#FF0000',
            },
            {
                name: '20',
                // type: 'sma',
                linkedTo: 'dataseries',
                zIndex: 1,
                tooltip: {
                    enabled: false
                }
            },
            {
                name: '60',
                // type: 'sma',
                linkedTo: 'dataseries',
                zIndex: 1,
                marker: {
                    enabled: false
                },
                tooltip: {
                    enabled: false
                }
            },
            {
                name: '120',
                // type: 'sma',
                linkedTo: 'dataseries',
                zIndex: 1,
                marker: {
                    enabled: false
                },
                tooltip: {
                    enabled: false
                }
            }
        ]
    }

    return (

        <div>
            <Segment basic textAlign='center'>
                <Input
                    action={{ color: 'blue', content: 'Search' }}
                    icon='search'
                    iconPosition='left'
                    placeholder='Order #'
                />

  
                  <Divider inverted/>
                <HighchartsReact
                highcharts={Highcharts}
                options={option}
            />
            </Segment>

            
        </div>
    )
}