import { ADD_TO_CART, INCREASE, DECREASE, REMOVE } from "./Constants";

const initState = {
  products: [],
  total: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case ADD_TO_CART:
      const tempstate = state.products.filter(
        (item) => action.payload._id === item._id
      );
      if (tempstate.length > 0) {
        return state;
      } else {
        return {
          products: [...state.products, action.payload],
          total: state.total + 1,
        };
      }
    case INCREASE:
      const tempstate1 = state.products.map((item) => {
        if (item._id === action.payload._id) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          return item;
        }
      });
      return {
        products: tempstate1,
        total: state.total + 1,
      };
    case DECREASE:
      const tempstate2 = state.products.map((item) => {
        if (item._id === action.payload._id) {
          return { ...item, quantity: item.quantity - 1 };
        } else {
          return item;
        }
      });
      return {
        products: tempstate2,
        total: state.total - 1,
      };
    case REMOVE:
      const tempstate3 = state.products.filter(
        (item) => item._id !== action.payload._id
      );
      return {
        products: tempstate3,
        total: state.total - action.payload.quantity,
      };
    default:
      return { ...state };
  }
}

export { initState };
export default reducer;
