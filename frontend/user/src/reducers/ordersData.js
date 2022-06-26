const initialState = [];

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "POPULATE_ORDERS":
      return [...payload];
    case "UPDATE_ORDERS":
      return [...state, ...payload];
    case "DELETE_ORDERS_DATA":
      delete state[payload];
      return [...state];
    default:
      return state;
  }
};
