import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";

import rootReducer from "../reducers/";
//https://stackoverflow.com/questions/36031590/right-way-to-update-state-in-redux-reducers
const store = createStore(rootReducer, applyMiddleware(createLogger()));

export default store;
