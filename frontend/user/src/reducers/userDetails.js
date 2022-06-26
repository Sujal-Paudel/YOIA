const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "USER_PROFILE":
      return { ...payload };
    default:
      return state;
  }
};
