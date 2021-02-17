import {
  CART_ADD_PRODUCT,
  CART_REMOVE_PRODUCT,
} from '../constants/cartConstants';

export const cartReducer = (state = { cartContents: [] }, action) => {
  switch (action.type) {
    case CART_ADD_PRODUCT:
      const item = action.payload;
      const existingItem = state.cartItems.find(
        (x) => x.product === item.product
      );
      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existingItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case CART_REMOVE_PRODUCT:
    default:
      return state;
  }
};
