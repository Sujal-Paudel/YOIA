const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "DISPLAY_CONFIG":
      return { ...payload };
    default:
      return state;
  }
};
