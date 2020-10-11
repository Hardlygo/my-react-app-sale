import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import * as home from "./home/reducer";
import * as production from "./production/reducer";

export default createStore(
  combineReducers({ ...home, ...production }),
  applyMiddleware(thunk)
);
