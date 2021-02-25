import {
  ORDER_CREATION_FAILURE,
  ORDER_CREATION_REQUEST,
  ORDER_CREATION_SUCCESS,
} from '../constants/orderConstants';

export const orderCreationReducer = (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
    case ORDER_CREATION_REQUEST:
      return {
        loading: true,
      };
    case ORDER_CREATION_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };
    case ORDER_CREATION_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
  }
};
