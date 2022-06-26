const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "POPULATE_ITEMS":
      return { ...payload };
    case "UPDATE_ITEMS":
      return { ...state, ...payload };
    case "DELETE_ITEMS_DATA":
      delete state[payload];
      return { ...state };
    default:
      return state;
  }
};
