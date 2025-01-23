import { createStore, combineReducers, applyMiddleware } from "redux";
import {thunk } from "redux-thunk";
import rootReducer from "./reducers";

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
