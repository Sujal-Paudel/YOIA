const initialState = null;

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "LOGGED_IN":
      return true;
    case "LOGGED_OUT":
      return false;
    default:
      return state;
  }
};
