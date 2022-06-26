const initialState = [];

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "POPULATE_LEDGER_DATA":
      return [...payload];
    case "UPDATE_LEDGER_DATA":
      return [...state, payload];
    case "DELETE_LEDGER_DATA":
      return state.filter((e) => e._id !== payload);
    default:
      return state;
  }
};
