import React, { Component } from "react";

import { FormWrapper, FormColumn, Input, Row } from "./calc_form_style";

//This component drew inspiration from https://github.com/gabrielwr/React-Retirement-Calculator

//https://www.robinwieruch.de/react-state-without-constructor
//https://reactjs.org/docs/forms.html
class CalculatorForm extends Component {
  render() {
    const {
      investmentReturnRate,
      retireAge,
      retireSpending,
      contribution,
      startingAge,
      lifeExpectancy
    } = this.props;

    return (
      <FormWrapper>
        <FormColumn>
          <Row>
            <span>Yearly Contribution</span>
            <Input
              name="Contribution"
              onChange={this.props.changeHandler}
              defaultValue={contribution}
            />
            <span>$/yr</span>
          </Row>
          <Row>
            <span>Average Yearly Return</span>
            <Input
              name="InvestmentReturnRate"
              onChange={this.props.changeHandler}
              defaultValue={investmentReturnRate}
            />
            <span>%</span>
          </Row>
          <Row>
            <span>Starting Age</span>
            <Input
              name="StartingAge"
              onChange={this.props.changeHandler}
              defaultValue={startingAge}
            />
            <span>yrs</span>
          </Row>
        </FormColumn>
        <FormColumn>
          <Row>
            <span>Retirement Age</span>
            <Input
              name="RetireAge"
              onChange={this.props.changeHandler}
              defaultValue={retireAge}
            />
            <span>yrs</span>
          </Row>
          <Row>
            <span>Yearly Withdrawal Ammount</span>
            <Input
              name="RetireSpending"
              onChange={this.props.changeHandler}
              defaultValue={retireSpending}
            />
            <span>$ </span>
          </Row>
          <Row>
            <span> Life Expectancy</span>
            <Input
              name="LifeExpectancy"
              onChange={this.props.changeHandler}
              defaultValue={lifeExpectancy}
            />
            <span>yrs</span>
          </Row>
        </FormColumn>
      </FormWrapper>
    );
  }
}

export default CalculatorForm;
