import isLogged from "./isLogged";
import configData from "./configData";
import itemsData from "./itemsData";
import ordersData from "./ordersData";
import clientsData from "./clientsData";
import snackbar from "./snackbar";

import { combineReducers } from "redux";

const allReducers = combineReducers({
  isLogged,
  configData,
  itemsData,
  ordersData,
  clientsData,
  snackbar,
});

export default allReducers;
