import React, { Component } from "react";
import { connect } from "react-redux";
import * as R from "ramda";

import { actions as calculationDataActions } from "../../reducers/calculation-data";

import CalculatorForm from "../../components/calculator-form";
import Chart from "../../components/chart";

import { CalculatorContainerWrapper, ContentWrapper } from "./styled";

import { IconButton, IconImage } from "../../elements/styled";

import ContinueIcon from "../../assets/continue.svg";

const {
  setFinalSavings,
  setGraphData,
  setInvestmentReturnRate,
  setLifeExpectancy,
  setRetireAge,
  setRetireAmt,
  setRetireSpending,
  setSalary,
  setStartingAge
} = calculationDataActions;

class CalculatorContainer extends Component {
  componentDidMount() {
    this.computeData();
    this.setState({});
    console.log("RE-RENDER!!!!!!!!!!!!!!!!!!!");
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  computeData() {
    const {
      startingAge,
      salary,
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
    //console.log(interestRate);
    for (let currentYear = 0; currentYear <= totalYears; currentYear++) {
      graphData.push({
        savings: accumulatedSavings,
        age: currentAge
      });
      if (currentAge < retireAge) {
        accumulatedSavings = Math.floor(accumulatedSavings + salary);
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
    console.log("GRAPHDATA");
    console.log(this.props.graphData);
  }

  /* handleStartingAge = (age) => {
    const {
      retireAge,
      setLifeExpectancy,
      lifeExpectancy,
      setStartingAge,
      setRetireAge
    } = this.props;

    if (age >= retireAge) {
      setRetireAge(age + 1);
    }
    if (age >= lifeExpectancy) {
      setLifeExpectancy(age + 1);
    }
    setStartingAge(age);
  };

  handleRetirementAge = (_evt, retireAge) => {
    const {
      setStartingAge,
      setRetireAge,
      startingAge,
      lifeExpectancy
    } = this.props;
    if (retireAge <= startingAge) {
      setStartingAge(retireAge - 1);
    } else if (retireAge >= lifeExpectancy) {
      setRetireAge(lifeExpectancy - 1);
    }
    setRetireAge(retireAge);
    this.computeData();
  }; */

  changeHandler = (keyName) => {
    return (_evt) => {
      this.props[`set${keyName}`](Number(_evt.target.value));
      console.log(this.props);
      this.computeData();
    };
  };

  render() {
    console.log("CALCULATOR CONTAINER");
    const {
      finalSavings,
      investmentReturnRate,
      retireAge,
      retireAmt,
      retireSpending,
      salary,
      startingAge,
      lifeExpectancy,
      graphData
    } = this.props;
    console.log("THIS.PROPS");
    console.log(this.props);
    const formProps = {
      finalSavings,
      investmentReturnRate,
      retireAge,
      retireAmt,
      retireSpending,
      salary,
      startingAge,
      lifeExpectancy,
      graphData,
      //handleStartingAge: this.handleStartingAge,
      //handleRetirementAge: this.handleRetirementAge,
      changeHandler: this.changeHandler
    };
    console.log("FORMPROPS");
    console.log(formProps);
    return (
      <ContentWrapper>
        <CalculatorContainerWrapper>
          <CalculatorForm onChange={this.changeHandler} {...formProps} />
          <Chart />
        </CalculatorContainerWrapper>
      </ContentWrapper>
    );
  }
}

const mapState = (state) => {
  const finalSavings = R.path(["calculationData", "finalSavings"])(state);
  const investmentReturnRate = R.path([
    "calculationData",
    "investmentReturnRate"
  ])(state);
  const retireAge = R.path(["calculationData", "retireAge"])(state);
  const retireAmt = R.path(["calculationData", "retireAmt"])(state);
  const retireSpending = R.path(["calculationData", "retireSpending"])(state);
  const salary = R.path(["calculationData", "salary"])(state);
  const startingAge = R.path(["calculationData", "startingAge"])(state);
  const graphData = R.path(["calculationData", "graphData"])(state);
  const lifeExpectancy = R.path(["calculationData", "lifeExpectancy"])(state);

  return {
    finalSavings,
    investmentReturnRate,
    retireAge,
    retireAmt,
    retireSpending,
    salary,
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
  setRetireAmt,
  setRetireSpending,
  setSalary,
  setStartingAge
};

export default connect(mapState, mapDispatch)(CalculatorContainer);
