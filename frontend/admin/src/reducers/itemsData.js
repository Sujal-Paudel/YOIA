const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "POPULATE_ITEMS":
      return { ...payload };
    case "ADD_ITEM":
      return { ...state, [payload._id]: payload };
    case "DELETE_ITEMS_DATA":
      delete state[payload];
      return { ...state };
    case "UPDATE_ITEMS":
      const item = state[payload._id];
      Object.keys(payload).map((key) => {
        key !== "_id" && (item[key] = payload[key]);
      });
      return { ...state };
    case "UPDATE_INVENTORY":
      state[payload._id].inventory = payload.inventory;
      return { ...state };
    default:
      return state;
  }
};
