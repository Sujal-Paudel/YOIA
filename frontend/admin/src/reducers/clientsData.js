const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "POPULATE_CLIENTS":
      return { ...payload };
    case "ADD_CLIENT":
      return { ...state, payload };
    case "UPDATE_CLIENTS":
      return { ...state, ...payload };
    case "DELETE_CLIENTS_DATA":
      delete state[payload];
      return { ...state };
    default:
      return state;
  }
};
