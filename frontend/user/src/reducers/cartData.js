const { getStoredProps, setLocalStorage } = require("../utils/index");

const initialState = getStoredProps("cartData") || {};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "POPULATE_CART":
      return { ...initialState };
    case "UPDATE_CART":
      state[payload._id] = payload;
      setLocalStorage({ itemName: "cartData", data: state });
      return { ...state };
    case "ADD_CART_DATA":
      if (state.hasOwnProperty(payload._id)) {
        state[payload._id].quantity++;
      } else {
        state[payload._id] = {
          ...payload,
          quantity: payload.minOrder,
        };
      }
      setLocalStorage({ itemName: "cartData", data: state });
      return { ...state };
    case "SUBTRACT_CART_DATA":
      console.log(payload);
      if (state[payload._id].quantity > payload.minOrder) {
        state[payload._id].quantity--;
      } else {
        delete state[payload._id];
      }
      setLocalStorage({ itemName: "cartData", data: state });
      return { ...state };
    case "DELETE_CART_DATA":
      delete state[payload._id];
      setLocalStorage({ itemName: "cartData", data: state });
      return { ...state };
    case "RESET_CART_DATA":
      setLocalStorage({ itemName: "cartData", data: {} });
      return {};
    default:
      return state;
  }
};
