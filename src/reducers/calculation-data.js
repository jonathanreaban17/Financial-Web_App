import { assoc } from "ramda";

/*
  # (reducer) calculation-data

  The `calculation-data` reducer describes user-specified data needed for graph calculation

*/
export const actionTypes = {
  SET_FINAL_SAVINGS: "CALCULATION_DATA_SET_FINAL_SAVINGS",
  SET_GRAPH_DATA: "CALCULATION_DATA_SET_GRAPH_DATA",
  SET_INVESTMENT_RETURN_RATE: "CALCULATION_DATA_SET_INVESTMENT_RETURN_RATE",
  SET_LIFE_EXPECTANCY: "CALCULATION_DATA_SET_LIFE_EXPECTANCY",
  SET_STARTING_AGE: "CALCULATION_DATA_SET_STARTING_AGE",
  SET_RETIRE_AGE: "CALCULATION_DATA_SET_RETIRE_AGE",
  SET_RETIRE_AMT: "CALCULATION_DATA_SET_RETIRE_AMT",
  SET_RETIRE_SPENDING: "CALCULATION_DATA_SET_RETIRE_SPENDING",
  SET_SALARY: "CALCULATION_DATA_SET_SALARY"
};

export const actions = {
  setFinalSavings(savings) {
    return { type: actionTypes.SET_FINAL_SAVINGS, savings };
  },
  setGraphData(graphData) {
    return { type: actionTypes.SET_GRAPH_DATA, graphData };
  },
  setInvestmentReturnRate(returnRate) {
    return { type: actionTypes.SET_INVESTMENT_RETURN_RATE, returnRate };
  },
  setLifeExpectancy(lifeExpectancy) {
    return { type: actionTypes.SET_LIFE_EXPECTANCY, lifeExpectancy };
  },
  setRetireAge(retireAge) {
    return { type: actionTypes.SET_RETIRE_AGE, retireAge };
  },
  setRetireAmt(retireAmt) {
    return { type: actionTypes.SET_RETIRE_AMT, retireAmt };
  },
  setRetireSpending(retireSpending) {
    return { type: actionTypes.SET_RETIRE_SPENDING, retireSpending };
  },
  setSalary(salary) {
    return { type: actionTypes.SET_SALARY, salary };
  },
  setStartingAge(age) {
    return { type: actionTypes.SET_STARTING_AGE, age };
  }
};

export const INITIAL_STATE = {
  finalSavings: 0,
  graphData: [],
  investmentReturnRate: 7,
  lifeExpectancy: 80,
  retireAge: 65,
  retireAmt: 0,
  retireSpending: 100000,
  salary: 6000,
  startingAge: 22
};

export default (_state = INITIAL_STATE, action) => {
  let state = Object.assign({}, _state);

  switch (action.type) {
    case actionTypes.SET_FINAL_SAVINGS:
      state = assoc("finalSavings", action.savings)(state);
      break;

    case actionTypes.SET_GRAPH_DATA:
      state = assoc("graphData", action.graphData)(state);
      break;

    case actionTypes.SET_INVESTMENT_RETURN_RATE:
      state = assoc("investmentReturnRate", action.returnRate)(state);
      break;

    case actionTypes.SET_LIFE_EXPECTANCY:
      state = assoc("lifeExpectancy", action.lifeExpectancy)(state);
      break;

    case actionTypes.SET_RETIRE_AGE:
      state = assoc("retireAge", action.retireAge)(state);
      break;

    case actionTypes.SET_RETIRE_AMT:
      state = assoc("retireAmt", action.retireAmt)(state);
      break;

    case actionTypes.SET_RETIRE_SPENDING:
      state = assoc("retireSpending", action.retireSpending)(state);
      break;

    case actionTypes.SET_SALARY:
      state = assoc("salary", action.salary)(state);
      break;

    case actionTypes.SET_STARTING_AGE:
      state = assoc("startingAge", action.age)(state);
      break;

    default:
      return state;
  }

  return state;
};
