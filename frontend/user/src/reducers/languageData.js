import { englishTexts, nepaliTexts } from "../utils/language";
const { getStoredProps } = require("../utils/index");

const langPreference = getStoredProps("langPreference") || "NP";

const initialState =
  langPreference === "NP"
    ? nepaliTexts
    : Object.keys(nepaliTexts).reduce((a, e) => ({ ...a, [e]: e }), {});

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "POPULATE_LANGUAGE_DATA":
      return { ...payload };
    default:
      return state;
  }
};
