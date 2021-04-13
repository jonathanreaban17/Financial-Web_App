import { combineReducers } from "redux";

import calculationData from "./calculation-data";
//https://stackoverflow.com/questions/36031590/right-way-to-update-state-in-redux-reducers
const rootReducer = combineReducers({
  calculationData
});

export default rootReducer;
