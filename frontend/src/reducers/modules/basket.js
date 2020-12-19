import {
  ADD_PRODUCT_TO_CART,
  REMOVE_PRODUCT_FROM_CART,
  UPDATE_BASKET_ITEMS,
  UPDATE_BASKET_MODAL_STATE
} from "../../constants/basket";

const initState = {
  items: [],
  isOpenModal: true
};

const basket = (state = initState, action) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART:
      let existedItem = state.items.find(i => i.product_id === action.payload.product_id)
      if(existedItem)
        return {
          ...state,
          items: state.items.map(i => {
            if (i.product_id === action.payload.product_id) {
              i.waranty += 1
            }
            return i
          })
        }
      return {
        ...state,
        items: [
          ...state.items,
          action.payload
        ]
      }
    case UPDATE_BASKET_ITEMS:
      return {
        ...state,
        items: [...action.payload]
      }
    case REMOVE_PRODUCT_FROM_CART:
      return {
        ...state,
        items: state.items.filter(i => i.product_id !== action.payload)
      }
    case UPDATE_BASKET_MODAL_STATE:
      return {
        ...state,
        isOpenModal: action.payload
      }
    default:
      return state
  }
};

export default basket