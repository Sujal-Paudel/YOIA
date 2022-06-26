const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "POPULATE_ORDERS":
      return { ...payload };
    case "ADD_ORDERS":
      return { ...state, payload };
    case "UPDATE_ORDERS":
      return { ...state, [payload._id]: payload };
    case "DELETE_ORDERS_DATA":
      delete state[payload];
      return { ...state };
    default:
      return state;
  }
};
