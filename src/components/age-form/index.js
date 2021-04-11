import React, { Component } from "react";
import Proptypes from "prop-types";
import { connect } from "react-redux";
import * as R from "ramda";

import { AgeFormWrapper, AgeFormInput } from "./styled";

class AgeForm extends Component {
  /*   constructor(props) {
    super(props);
    this.state = {
      startingAge: "",
      lifeExpectancy: ""
    };
    this.handleChange = this.handleChange.bind(this);
  } */

  handleLifespanAge = (_evt, lifeExpectancy) => {
    const { startingAge, addCurrentAge, setLifeExpectancy } = this.props;

    if (lifeExpectancy <= +startingAge) {
      addCurrentAge(lifeExpectancy - 1);
    }
    setLifeExpectancy(lifeExpectancy);
    this.computeData();
    console.log(lifeExpectancy);
  };

  /*   handleChange(event) {
    this.setState({
      // Computed property names
      // keys of the objects are computed dynamically
      [event.target.name]: event.target.value
    });
    console.log(event.target.name);
  } */

  render() {
    const {
      startingAge,
      lifeExpectancy,
      handleStartingAge,
      handleRetirementAge
    } = this.props;
    return (
      <AgeFormWrapper>
        <span>I am</span>
        <AgeFormInput
          name="startingAge"
          onChange={this.handleChange}
          type="number"
          defaultValue={startingAge}
        />
        <span>years old with a life expectancy of</span>
        <AgeFormInput
          name="lifeExpectancy"
          onChange={this.handleChange}
          type="number"
          defaultValue={lifeExpectancy}
        />
      </AgeFormWrapper>
    );
  }
}

const mapStateToProps = (state) => {
  const lifeExpectancy = R.path(["calculationData", "lifeExpectancy"])(state);
  const startingAge = R.path(["calculationData", "startingAge"])(state);

  return {
    lifeExpectancy,
    startingAge
  };
};

AgeForm.proptypes = {
  lifeExpectancy: Proptypes.number,
  startingAge: Proptypes.number
};

export { AgeForm };
export default connect(mapStateToProps)(AgeForm);
