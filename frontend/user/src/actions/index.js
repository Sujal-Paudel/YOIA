import fetchy from "../utils/fetchy";
import { convertArrayToObject } from "../utils";
import { nepaliTexts } from "../utils/language";

const changeLanguage = (currentLang) => {
  return (dispatch) => {
    if (currentLang === "NP") {
      dispatch({ type: "LANGUAGE_EN" });
      dispatch({
        type: "POPULATE_LANGUAGE_DATA",
        payload: Object.keys(nepaliTexts).reduce(
          (a, e) => ({ ...a, [e]: e }),
          {}
        ),
      });
    } else {
      dispatch({ type: "LANGUAGE_NP" });
      dispatch({ type: "POPULATE_LANGUAGE_DATA", payload: nepaliTexts });
    }
  };
};

const fetchUserProfile = () => {
  return (dispatch) => {
    fetchy(`/api/v1/users/details`, "POST").then((res) => {
      if (res.success) {
        console.log(res);
        dispatch({
          type: "LOGGED_IN",
        });
        dispatch({
          type: "USER_PROFILE",
          payload: res.data,
        });
      } else if (res.success === false) {
        dispatch({ type: "LOGGED_OUT" });
      }
    });
  };
};

const fetchItemsData = ({ type, data }) => {
  return (dispatch) => {
    fetchy(`/api/v1/items`, "POST", data).then(({ success, data }) => {
      console.log(data);
      if (success) {
        dispatch({
          type,
          payload: convertArrayToObject(data.items, "_id"),
        });
        dispatch({
          type: "DISPLAY_CONFIG",
          payload: data.display,
        });
      }
    });
  };
};

const fetchSearchData = ({ query }) => {
  return (dispatch) => {
    fetchy(`/api/v1/search`, "POST", { query }).then(({ success, data }) => {
      console.log(data);
      if (success) {
        dispatch({
          type: "POPULATE_SEARCH",
          payload: data,
        });
      }
    });
  };
};

const fetchLedgerData = ({ month }) => {
  return (dispatch) => {
    fetchy(`/api/v1/accounting/ledger`, "POST", { month }).then(
      ({ success, data }) => {
        console.log(data);
        if (success && data) {
          dispatch({
            type: "POPULATE_LEDGER_DATA",
            payload: data.entries,
          });
        }
      }
    );
  };
};

const fetchDebitCreditData = ({ accountType }) => {
  return (dispatch) => {
    fetchy(`/api/v1/accounting/debitcredit`, "POST", {
      accountType,
    }).then(({ success, data }) => {
      console.log(data);
      if (success && data) {
        dispatch({
          type: "POPULATE_DEBIT_DATA",
          payload: data
            .filter((e) => e.accountType === "debit")
            .map((e) => e.entries)
            .flat(),
        });
        dispatch({
          type: "POPULATE_CREDIT_DATA",
          payload: data
            .filter((e) => e.accountType === "credit")
            .map((e) => e.entries)
            .flat(),
        });
      }
    });
  };
};

export {
  changeLanguage,
  fetchUserProfile,
  fetchItemsData,
  fetchSearchData,
  fetchLedgerData,
  fetchDebitCreditData,
};
