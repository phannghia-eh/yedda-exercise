import {
  UPDATE_PRODUCT_ITEMS
} from "../../constants/product";

const initState = {
  items: [],
};

const product = (state = initState, action) => {
  switch (action.type) {
    case UPDATE_PRODUCT_ITEMS:
      return {
        ...state,
        items: action.payload
      }
    default:
      return state
  }
};

export default product