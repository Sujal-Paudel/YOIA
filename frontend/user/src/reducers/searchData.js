const initialState = [];

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "POPULATE_SEARCH":
      return [...payload];
    default:
      return state;
  }
};
