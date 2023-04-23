import { AnyAction } from "redux";

import { setCartItems, setIsCartOpen } from "./cart.action";

import { CartItem } from "./cart.types";

export type CartState = {
  readonly isCartOpen: boolean;
  readonly cartItems: CartItem[];
};

export const CART_INITIAL_STATE: CartState = {
  isCartOpen: false,
  cartItems: [],
};

export const cartReducer = (
  // It should only update if you return a new object.
  state = CART_INITIAL_STATE,
  action: AnyAction
): CartState => {
  // So this just prevents anybody from coming in here and modifying it like so saying:
  // state.isCartOpen = false; // This assignment cannot be done. we want these states to be completely immutable.

  if (setIsCartOpen.match(action)) {
    return {
      ...state,
      isCartOpen: action.payload,
    };
  }

  if (setCartItems.match(action)) {
    return {
      ...state,
      cartItems: action.payload,
    };
  }

  return state;
};
