import React from 'react';

import {
  HorizontalGridLines,
  LineMarkSeries,
  XYPlot,
  XAxis,
  YAxis
} from 'react-vis';

const data = new Array(10).fill(0).reduce(
  (prev, curr) => [
    ...prev,
    {
      x: prev.slice(-1)[0].x + 1,
      y: prev.slice(-1)[0].y * (1 + Math.random() * 0.2)
    }
  ],
  [{ x: 0, y: 10 }]
);

class BurnDownChart extends React.Component {
  render() {
    return (
      <XYPlot width={400} height={300}>
        <XAxis />
        <YAxis />
        <HorizontalGridLines />
        <LineMarkSeries data={data} />
      </XYPlot>
    );
  }
}

export default BurnDownChart;
