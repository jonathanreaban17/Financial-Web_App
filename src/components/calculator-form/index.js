import React, { Component } from "react";

import { formatMoney } from "../../utils/formatMoney";

import { FormWrapper, FormColumn, Input, Row } from "./styled";

import Proptypes from "prop-types";
import { connect } from "react-redux";
import * as R from "ramda";

class CalculatorForm extends Component {
  render() {
    const {
      handleCurrentAge,
      handleRetirementAge,
      handleLifespanAge,
      startingSavings,
      investmentReturnRate,
      retireAge,
      retireSpending,
      salary,
      startingAge,
      salaryIncrease,
      savingsRate,
      changeHandler,
      lifeExpectancy
    } = this.props;

    return (
      <FormWrapper>
        <FormColumn>
          <Row>
            <span>Yearly Contribution</span>
            <Input
              name="salary"
              onChange={this.props.changeHandler("Salary")}
              defaultValue={salary}
            />
            <span>$/yr</span>
          </Row>
          <Row>
            <span>Average Yearly Return</span>
            <Input
              name="investmentReturnRate"
              onChange={this.props.changeHandler("InvestmentReturnRate")}
              defaultValue={investmentReturnRate}
            />
            <span>%</span>
          </Row>
          <Row>
            <span>Starting Age</span>
            <Input
              name="startingAge"
              onChange={this.props.changeHandler("StartingAge")}
              defaultValue={startingAge}
            />
            <span>y/o</span>
          </Row>
        </FormColumn>
        <FormColumn>
          <Row>
            <span>Retirement Age</span>
            <Input
              name="retireAge"
              onChange={this.props.changeHandler("RetireAge")}
              defaultValue={retireAge}
            />
            <span>yrs</span>
          </Row>
          <Row>
            <span>Yearly Withdrawal Ammount</span>
            <Input
              name="retireSpending"
              onChange={this.props.changeHandler("RetireSpending")}
              defaultValue={retireSpending}
            />
            <span>$ </span>
          </Row>
          <Row>
            <span> Life Expectancy</span>
            <Input
              name="lifeExpectancy"
              onChange={this.props.changeHandler("LifeExpectancy")}
              defaultValue={lifeExpectancy}
            />
            <span>y/o</span>
          </Row>
        </FormColumn>
      </FormWrapper>
    );
  }
}

export default CalculatorForm;
