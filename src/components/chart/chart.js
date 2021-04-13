import React, { Component } from "react";

import LineChart from "../../elements/line-chart/line_chart";

import { ChartWrapper } from "./chart_style";

//This component drew inspiration from https://github.com/gabrielwr/React-Retirement-Calculator

class Chart extends Component {
  render() {
    const { graphData, retireAge, startingAge } = this.props;
    return (
      <ChartWrapper>
        <LineChart {...this.props} />
      </ChartWrapper>
    );
  }
}

export default Chart;
