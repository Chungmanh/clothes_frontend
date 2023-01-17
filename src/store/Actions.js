import { ADD_TO_CART } from "./Constants";
import { INCREASE } from "./Constants";
import { DECREASE } from "./Constants";
import { REMOVE } from "./Constants";

export const addToCart = (payload) => ({
  type: ADD_TO_CART,
  payload,
});

export const increase = (payload) => ({
  type: INCREASE,
  payload,
});

export const decrease = (payload) => ({
  type: DECREASE,
  payload,
});

export const remove = (payload) => ({
  type: REMOVE,
  payload,
});
