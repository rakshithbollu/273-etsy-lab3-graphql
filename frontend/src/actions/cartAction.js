import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  CART_DETAILS_REQUEST,
  CART_DETAILS_FAILURE,
  CART_DETAILS_SUCCESS,
} from "../constants/cartConstants";
import { ADD_PRODUCTS_CART } from "../mutation";
import { DELETE_CART_ITEMS } from "../mutation";
import { ADD_GIFT } from "../mutation";
import { ADD_GIFT_DESC } from "../mutation";
import { GET_CART_INFO } from "../queries";
import axios from "axios";

// Adding the productdetails to Cart
export const addItemsToCart =
  (productid, quantity, email, price, shopname, productname, image_URL) =>
  async (dispatch) => {
    const query = ADD_PRODUCTS_CART;
    const variables = {
      email: email,
      product: productid,
      quantity: quantity,
      price: price,
      shopname: shopname,
      productname: productname,
      image_URL: image_URL,
    };

    const { data } = await axios.post("/graphql", { query, variables });

    dispatch({
      type: ADD_TO_CART,
      payload: data.data.addproductstocart,
    });
  };

export const getCartDetails = (email) => async (dispatch) => {
  dispatch({ type: CART_DETAILS_REQUEST });
  try {
    const query = GET_CART_INFO;
    const variables = {
      email: email,
    };

    const { data } = await axios.post("/graphql", { query, variables });
    dispatch({
      type: CART_DETAILS_SUCCESS,
      payload: data.data.getcartInfo,
    });
  } catch (error) {
    dispatch({
      type: CART_DETAILS_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const addGiftOption =
  (productid, email, giftoption) => async (dispatch) => {
    dispatch({ type: CART_DETAILS_REQUEST });
    try {
      const query = ADD_GIFT;
      const variables = {
        product: productid,
        email: email,
        giftoption: giftoption,
      };

      const { data } = await axios.post("/graphql", { query, variables });
    } catch (error) {
      alert("error occuered while adding the giftoption");
    }
  };

export const addGiftDescription =
  (productid, email, giftdescription) => async (dispatch) => {
    dispatch({ type: CART_DETAILS_REQUEST });
    try {
      const query = ADD_GIFT_DESC;
      const variables = {
        product: productid,
        email: email,
        giftdescription: giftdescription,
      };

      const { data } = await axios.post("/graphql", { query, variables });
    } catch (error) {
      alert("error occuered while adding the giftoption");
    }
  };

export const removeItemsFromCart = (productid, email) => async (dispatch) => {
  const query = DELETE_CART_ITEMS;
  const variables = {
    email: email,
    product: productid,
  };

  const { data } = await axios.post("/graphql", { query, variables });
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: data.data.deletecartitems,
  });
};
