const initialState = [];

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "ADD_COMPARE":
      return [...state, payload];
    case "DELETE_COMPARE":
      return [...state.filter((e) => e._id !== payload._id)];
    default:
      return state;
  }
};
