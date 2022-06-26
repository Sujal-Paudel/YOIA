const { getStoredProps, setLocalStorage } = require("../utils/index");
const initialState = getStoredProps("isLogged") || null;

export default (state = initialState, { type }) => {
  switch (type) {
    case "LOGGED_IN":
      setLocalStorage({ itemName: "isLogged", data: true });
      return true;
    case "LOGGED_OUT":
      setLocalStorage({ itemName: "isLogged", data: false });
      return false;
    default:
      return state;
  }
};
