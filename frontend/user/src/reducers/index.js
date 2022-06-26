import isLogged from "./isLogged";
import userDetails from "./userDetails";
import itemsData from "./itemsData";
import configData from "./configData";
import ordersData from "./ordersData";
import searchData from "./searchData";
import compareData from "./compareData";
import cartData from "./cartData";
import ledgerData from "./ledgerData";
import debitData from "./debitData";
import creditData from "./creditData";
import snackbar from "./snackbar";
import langPreference from "./langPreference";
import languageData from "./languageData";

import { combineReducers } from "redux";

const allReducers = combineReducers({
  isLogged,
  userDetails,
  itemsData,
  configData,
  ordersData,
  searchData,
  compareData,
  cartData,
  ledgerData,
  debitData,
  creditData,
  snackbar,
  langPreference,
  languageData,
});

export default allReducers;
