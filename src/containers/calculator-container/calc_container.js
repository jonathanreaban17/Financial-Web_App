import React, { Component } from "react";
import { connect } from "react-redux";
import * as R from "ramda";

import { actions as calculationDataActions } from "../../reducers/calculation-data";

import CalculatorForm from "../../components/calculator-form/calc_form";
import Chart from "../../components/chart/chart";

import {
  CalculatorContainerWrapper,
  ContentWrapper
} from "./calc_container_style";

const {
  setFinalSavings,
  setGraphData,
  setInvestmentReturnRate,
  setLifeExpectancy,
  setRetireAge,
  setRetireSpending,
  setContribution,
  setStartingAge
} = calculationDataActions;

class CalculatorContainer extends Component {
  //https://www.w3schools.com/react/react_state.asp
  //https://reactjs.org/docs/faq-state.html
  constructor(props) {
    super(props);
    this.state = {
      graphData: [],
      finalSavings: 0,
      startingAge: 22,
      lifeExpectancy: 80,
      retireAge: 65,
      contribution: 6000,
      retireSpending: 100000,
      investmentReturnRate: 7
    };
    this.changeHandler = this.changeHandler.bind(this);
  }
  //https://stackoverflow.com/questions/30626030/can-you-force-a-react-component-to-rerender-without-calling-setstate
  componentDidMount() {
    this.computeData();
    this.forceUpdate();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  computeData() {
    const {
      startingAge,
      contribution,
      lifeExpectancy,
      investmentReturnRate,
      retireAge,
      retireSpending
    } = this.props;
    let graphData = [];
    const totalYears = lifeExpectancy - startingAge;
    let currentAge = startingAge;
    let accumulatedSavings = 0;
    let interestRate = investmentReturnRate / 100;
    let interest = 0;
    for (let currentYear = 0; currentYear <= totalYears; currentYear++) {
      graphData.push({
        savings: accumulatedSavings,
        age: currentAge
      });
      if (currentAge < retireAge) {
        accumulatedSavings = Math.floor(accumulatedSavings + contribution);
        interest = accumulatedSavings * interestRate;
        accumulatedSavings = Math.floor(accumulatedSavings + interest);
      } else {
        accumulatedSavings = Math.floor(accumulatedSavings - retireSpending);
        interest = accumulatedSavings * interestRate;
        accumulatedSavings = Math.floor(accumulatedSavings + interest);
      }

      currentAge++;
    }
    setFinalSavings(accumulatedSavings);
    setGraphData(graphData);
    this.props.setFinalSavings(accumulatedSavings);
    this.props.setGraphData(graphData);
  }

  //https://www.pluralsight.com/guides/handling-multiple-inputs-with-single-onchange-handler-react
  //https://stackoverflow.com/questions/36031590/right-way-to-update-state-in-redux-reducers
  //https://stackoverflow.com/questions/55495198/reacts-setstate-method-with-prevstate-argument
  //https://stackoverflow.com/questions/30626030/can-you-force-a-react-component-to-rerender-without-calling-setstate
  //https://www.geeksforgeeks.org/how-to-handle-multiple-input-field-in-react-form-with-a-single-function/
  //https://reactjs.org/docs/handling-events.html
  //https://stackoverflow.com/questions/41317343/react-js-how-to-access-to-input-value-in-child-component
  //https://stackoverflow.com/questions/35537229/how-to-update-parents-state-in-react
  //https://stackoverflow.com/questions/50086590/how-to-pass-an-event-handler-as-a-prop-in-react
  //https://www.freecodecamp.org/news/how-to-update-a-components-prop-in-react-js-oh-yes-it-s-possible-f9d26f1c4c6d/
  //https://www.w3schools.com/js/js_type_conversion.asp
  //https://stackoverflow.com/questions/45282216/react-update-screen-after-changing-values-in-the-state
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
  //Duc and Omid for answering questions on the Q&A related to this method.
  //This method was a real pain in the ass and figuring it out took many many many hours.
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
  changeHandler = async (keyName) => {
    await this.props[`set${keyName.target.name}`](Number(keyName.target.value));
    this.computeData();
  };

  render() {
    const {
      finalSavings,
      investmentReturnRate,
      retireAge,
      retireSpending,
      contribution,
      startingAge,
      lifeExpectancy,
      graphData
    } = this.props;
    const formProps = {
      finalSavings,
      investmentReturnRate,
      retireAge,
      retireSpending,
      contribution,
      startingAge,
      lifeExpectancy,
      graphData,
      changeHandler: this.changeHandler
    };
    //https://www.robinwieruch.de/react-pass-props-to-component
    return (
      <ContentWrapper>
        <CalculatorContainerWrapper>
          <CalculatorForm onChange={this.changeHandler} {...formProps} />
          <Chart
            graphData={graphData}
            retireAge={retireAge}
            startingAge={startingAge}
          />
        </CalculatorContainerWrapper>
      </ContentWrapper>
    );
  }
}
//https://stackoverflow.com/questions/36031590/right-way-to-update-state-in-redux-reducers
//https://react-redux.js.org/using-react-redux/connect-mapstate
//https://medium.com/@arecvlohe/functional-programming-in-js-with-ramda-5ea226e76df1
//https://stackoverflow.com/questions/55968010/how-to-use-state-of-one-component-in-another-file-in-reactjs/55968107
//https://www.pluralsight.com/guides/how-to-pass-props-object-from-child-component-to-parent-component
const mapStateToProps = (state) => {
  const finalSavings = R.path(["calculationData", "finalSavings"])(state);
  const investmentReturnRate = R.path([
    "calculationData",
    "investmentReturnRate"
  ])(state);
  const retireAge = R.path(["calculationData", "retireAge"])(state);
  const retireSpending = R.path(["calculationData", "retireSpending"])(state);
  const contribution = R.path(["calculationData", "contribution"])(state);
  const startingAge = R.path(["calculationData", "startingAge"])(state);
  const graphData = R.path(["calculationData", "graphData"])(state);
  const lifeExpectancy = R.path(["calculationData", "lifeExpectancy"])(state);
  return {
    finalSavings,
    investmentReturnRate,
    retireAge,
    retireSpending,
    contribution,
    startingAge,
    lifeExpectancy,
    graphData
  };
};

const mapDispatch = {
  setFinalSavings,
  setGraphData,
  setInvestmentReturnRate,
  setLifeExpectancy,
  setRetireAge,
  setRetireSpending,
  setContribution,
  setStartingAge
};
//https://redux.js.org/tutorials/fundamentals/part-2-concepts-data-flow
//https://read.reduxbook.com/markdown/part1/03-updating-state.html
export default connect(mapStateToProps, mapDispatch)(CalculatorContainer);
