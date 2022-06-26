import thunk from "redux-thunk";
import { createStore, compose, applyMiddleware } from "redux";

import allReducers from "./reducers";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(allReducers, composeEnhancer(applyMiddleware(thunk)));

export default store;
