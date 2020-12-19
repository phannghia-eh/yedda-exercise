import axios from 'axios'
import {toast} from "react-toastify";
import {
  ADD_PRODUCT_TO_CART,
  REMOVE_PRODUCT_FROM_CART,
  UPDATE_BASKET_ITEMS,
  UPDATE_BASKET_MODAL_STATE
} from "../constants/basket";

export const fetchCurrentBasket = () => {
  return dispatch => {
    return axios
      .get('http://192.168.254.128:8000/basket')
      .then(res => {
          dispatch(updateBasketItems(res.data))
      })
      .catch(err => {
        toast.error(err.message)
      })
  }
}

export const addProductToCart = product => {
  return (dispatch, state) => {
    return axios
      .post('http://192.168.254.128:8000/basket', {owner_id: state().user.id, product_id: product.id})
      .then(res => {
        dispatch(addProductItemToCart(product.id, state().user.id))
        toast.success('Successful add new bike to your basket')
      })
      .catch(err => {
        toast.error(err.message)
      })
  }
}

export const removeProduct = productId => {
  return (dispatch, state) => {
    return axios
      .delete('http://192.168.254.128:8000/basket', {
        params: {owner_id: state().user.id, product_id: productId}
      })
      .then(res => {
        dispatch(removeProductItemFromCart(productId))
      })
      .catch(err => {
        toast.error(err.message)
      })
  }
}

export const changeStateBasketModal = state => ({
  type: UPDATE_BASKET_MODAL_STATE,
  payload: state
})


const updateBasketItems = items => ({
  type: UPDATE_BASKET_ITEMS,
  payload: items
})

const addProductItemToCart = (productId, userId) => ({
  type: ADD_PRODUCT_TO_CART,
  payload: {product_id: productId, user_id: userId, waranty: 1}
})

const removeProductItemFromCart = productId => ({
  type: REMOVE_PRODUCT_FROM_CART,
  payload: productId
})