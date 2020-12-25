import React, { Component } from 'react';
import { render } from 'react-dom';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

import { Button, Divider, Input, Segment } from 'semantic-ui-react'


class LineChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // To avoid unnecessary update keep all options in the state.
      chartOptions: {
        xAxis: {
          categories: ['A', 'B', 'C'],
        },
        series: [
          { data: [1, 2, 3] }
        ],
        plotOptions: {
          series: {
            point: {
              events: {
                mouseOver: this.setHoverData.bind(this)
              }
            }
          }
        }
      },
      hoverData: null
    };
  }

  setHoverData = (e) => {
    // The chart is not updated because `chartOptions` has not changed.
    this.setState({ hoverData: e.target.category })
  }

  updateSeries = () => {
    // The chart is updated only with new options.
    this.setState({
      chartOptions: {
        series: [
          { data: [Math.random() * 5, 2, 1] }
        ]
      }
    });
  }

  render() {
    const { chartOptions, hoverData } = this.state;

    return (

      <div>
        <Segment basic textAlign='center'>
          <Input
            action={{ color: 'blue', content: 'Search' }}
            icon='search'
            iconPosition='left'
            placeholder='Order #'
          />

          <Divider horizontal>Or</Divider>
          <HighchartsReact
          highcharts={Highcharts}
          options={chartOptions}
        />
          <Button
            color='teal'
            content='Create New Order'
            icon='add'
            labelPosition='left'
          />
        </Segment>
        
     
      </div>
    )
  }
}

export default LineChart;