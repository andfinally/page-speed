/* global Plotly */
// Plot.js
import React from 'react';

class Plot extends React.Component {
  writePlot() {
    Plotly.newPlot('plot', [{
      x     : this.props.xData,
      y     : this.props.yData,
      type  : this.props.type,
      marker: {
        color: '#b3e5fc'
      }
    }], {
      margin: {
        t: 0, r: 0, l: 30
      },
      xaxis : {
        gridcolor: 'transparent',
        tickangle: -45,
        ticks: 'outside',
        tickformat: '%e %b'
      }
    }, {
      displayModeBar: false
    });
  }

  componentDidMount() {
    this.writePlot();
  }

  componentDidUpdate() {
    this.writePlot();
  }

  render() {
    return (
      <div id="plot"></div>
    );
  }
}

export default Plot;
