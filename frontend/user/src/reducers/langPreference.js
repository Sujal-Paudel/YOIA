const { getStoredProps, setLocalStorage } = require("../utils/index");

const initialState = getStoredProps("langPreference") || "NP";

export default (state = initialState, { type }) => {
  switch (type) {
    case "LANGUAGE_NP":
      setLocalStorage({ itemName: "langPreference", data: "NP" });
      return "NP";
    case "LANGUAGE_EN":
      setLocalStorage({ itemName: "langPreference", data: "EN" });
      return "EN";
    default:
      return state;
  }
};
