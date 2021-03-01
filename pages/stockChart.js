import React, { Component, useState, useEffect } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts/highstock';
import * as utils from "../lib/utils";
import useSwr from 'swr'
import { Input, Segment, Divider } from 'semantic-ui-react'

const fetcher = (url) => fetch(url).then((res) => {
    return res.json()
})

export default function StockChart() {

    const [ohlc, setOhlc] = useState();
    const [option, setOption] = useState();
    const { data, error } = useSwr('/api/stock', fetcher, {
        onSuccess: (data) => {
            
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
                ]];

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
            
            options.series[2]['data'] = [{x:230,title:'매도dddddddddjdj',text:''}];

            options.series[3]['data'] = utils.drawLine(data[0].data, 20);
            options.series[4]['data'] = utils.drawLine(data[0].data, 60);
            options.series[5]['data'] = utils.drawLine(data[0].data, 120);
            options.title.text = data[0].cname;

            setOption(options);
            console.log('options', options)

        }
    })

    
    if (!data) return <div>Loading...</div>
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