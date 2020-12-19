import axios from 'axios'
import {toast} from "react-toastify";
import {UPDATE_PRODUCT_ITEMS} from "../constants/product";

export function fetchProductList() {
  return dispatch => {
    axios
      .get('http://192.168.254.128:8000/product')
      .then(res => {
        dispatch(updateProductList(res.data))
      })
      .catch(error => {
        if (error.response)
          toast.error(error.response.message)
        else
          toast.error(error.message)
      })
  }
}

const updateProductList = items => ({
  type: UPDATE_PRODUCT_ITEMS,
  payload: items
})