import React from "react";
import styled from "styled-components";

import CalculatorContainer from "../containers/calculator-container/calc_container";
import Navbar from "./navbar/navbar";

const AppWrapper = styled.div`
  height: 100vh;
  width: 100vw;
`;

//The majority of the inspiration for this app came from https://github.com/gabrielwr/React-Retirement-Calculator.
//The repository he had on github wasn't functional however, and needed hours and hours of debugging and learning about
//redux, react, states, ramda, recharts, stores, and so much more to understand and fix a lot of what was going on.
//When I started this project I was reading a foreign language and by the end I feel like I am fairly competent in react.

const App = () => {
  return (
    <AppWrapper>
      <Navbar />
      <CalculatorContainer></CalculatorContainer>
    </AppWrapper>
  );
};

export default App;
