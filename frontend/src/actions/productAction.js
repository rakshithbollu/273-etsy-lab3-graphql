import axios from "axios";
import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  CLEAR_ERRORS,
} from "../constants/productConstants";
import { GET_ITEM_DETAILS } from "../queries";
import { FETCH_PRODUCTS } from "../queries";

export const getProduct =
  (keyword = "", price = [0, 10000], sortType = "price", outOfStock = 0) =>
  async (dispatch) => {
    //console.log("the one value" +one);
    try {
      const query = FETCH_PRODUCTS;
      dispatch({ type: ALL_PRODUCT_REQUEST });

      const variables = {
        keyword: keyword,
        min_price: price[0],
        max_price: price[1],
        sortType: sortType,
        outOfStock: outOfStock,
      };
      const res = await axios.post("/graphql", { query, variables });

      dispatch({
        type: ALL_PRODUCT_SUCCESS,
        payload: res.data.data.findProducts,
      });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getProductDetails = (_id) => async (dispatch) => {
  //const body = JSON.stringify({productid});
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const query = GET_ITEM_DETAILS;
    const variables = {
      _id: _id,
    };
    const { data } = await axios.post("/graphql", { query, variables });

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.data.getProductInfo,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
