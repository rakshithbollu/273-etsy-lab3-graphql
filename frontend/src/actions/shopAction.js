import axios from "axios";
import {
  SHOP_NAME_REQUEST,
  SHOP_NAME_SUCCESS,
  SHOP_NAME_FAIL,
  CLEAR_ERRORS,
  CREATE_SHOP_REQUEST,
  CREATE_SHOP_SUCCESS,
  CREATE_SHOP_FAIL,
  SHOP_DETAILS_REQUEST,
  SHOP_DETAILS_SUCCESS,
  SHOP_DETAILS_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  DELETE_PRODUCT,
  SAVE_SHOP_IMAGE,
  GET_CATEGORY_FAIL,
  GET_CATEGORY_SUCCESS,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAIL,
} from "../constants/shopConstants";
import { SHOP_UNIQUE_CHECK } from "../queries";
import { GET_SHOP_DETAILS } from "../queries";
import { ADD_PRODUCT } from "../mutation";
import { EDIT_PRODUCT } from "../mutation";
import { DELETE_SHOP_PRODUCT } from "../mutation";
import { UPLOAD_SHOP_IMAGE } from "../mutation";
import { CREATE_SHOP } from "../mutation";
// chekcing the shopname is created or not
export const getShopAvailability = (keyword) => async (dispatch) => {
  try {
    dispatch({ type: SHOP_NAME_REQUEST });
    const query = SHOP_UNIQUE_CHECK;
    const variables = {
      shopname: keyword,
    };
    const { data } = await axios.post("/graphql", { query, variables });

    if (data.data.shopuniquecheck.success) {
      dispatch({
        type: SHOP_NAME_SUCCESS,
        payload: data.data.shopuniquecheck.success,
      });
    } else {
      dispatch({
        type: SHOP_NAME_FAIL,
        payload: data.data.shopuniquecheck.success,
      });
    }
  } catch (error) {
    console.log(JSON.stringify(error));
  }
};

// creating the shopname
export const createShop = (keyword, email) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_SHOP_REQUEST });
    const query = CREATE_SHOP;
    const variables = {
      shopname: keyword,
      email: email,
    };

    const { data } = await axios.post("/graphql", { query, variables });

    dispatch({
      type: CREATE_SHOP_SUCCESS,
      payload: data.data.createshop.success,
    });
  } catch (error) {
    dispatch({
      type: CREATE_SHOP_FAIL,
      payload: error.response.data.message,
    });
  }
};

//getting shop details
export const getShopDetails = (shopname) => async (dispatch) => {
  //const body = JSON.stringify({productid});
  try {
    dispatch({ type: SHOP_DETAILS_REQUEST });
    const query = GET_SHOP_DETAILS;
    const variables = { shopname: shopname };
    console.log("action shop", shopname);
    const { data } = await axios.post("/graphql", { query, variables });

    dispatch({
      type: SHOP_DETAILS_SUCCESS,
      payload: data.data.getshopdetails.results,
      payload2: data.data.getshopdetails.shopdetails,
      payload1: data.data.getshopdetails.totalsalesrevenue,
    });
  } catch (error) {
    dispatch({
      type: SHOP_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//creating a product

export const createProduct =
  (
    productname,
    description,
    price,
    stock,
    currency,
    category,
    image_URL,
    shopname
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: CREATE_PRODUCT_REQUEST });
      const query = ADD_PRODUCT;
      const variables = {
        productname: productname,
        description: description,
        price: price,
        stock: stock,
        currency: currency,
        category: category,
        image_URL: image_URL,
        shopname: shopname,
      };

      const { data } = await axios.post("/graphql", { query, variables });

      dispatch({
        type: CREATE_PRODUCT_SUCCESS,
        payload: data.data.addproduct.success,
      });
    } catch (error) {
      dispatch({
        type: CREATE_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const updateProduct =
  (
    productid,
    productname,
    description,
    price,
    stock,
    currency,
    category,
    image_URL
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: UPDATE_PRODUCT_REQUEST });

      const query = EDIT_PRODUCT;
      const variables = {
        _id: productid,
        productname: productname,
        description: description,
        price: price,
        stock: stock,
        currency: currency,
        category: category,
        image_URL: image_URL,
      };

      const { data } = await axios.post("/graphql", { query, variables });

      dispatch({
        type: UPDATE_PRODUCT_SUCCESS,
        payload: data.data.editproduct.success,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const DeleteProduct = (productid) => async (dispatch) => {
  const query = DELETE_SHOP_PRODUCT;
  const variables = {
    _id: productid,
    product: productid,
  };

  const { data } = await axios.post("/graphql", { query, variables });
  dispatch({
    type: DELETE_PRODUCT,
    payload: data.data.deleteproduct.success,
  });
};

export const saveShopImage = (shopimage, email) => async (dispatch) => {
  const query = UPLOAD_SHOP_IMAGE;
  const variables = {
    shopimage: shopimage,
    email: email,
  };

  const { data } = await axios.post("/graphql", { query, variables });
  dispatch({
    type: SAVE_SHOP_IMAGE,
    payload: data.data.uploadshopimage.success,
  });
};

export const insertCategory = (shopname, category) => async (dispatch) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const productData = {
      shopname: shopname,
      category: category,
    };
    const { data } = await axios.post(
      `/api/shopname/shopcategory`,
      productData,
      config
    );

    dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: CREATE_CATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getCategory = (shopname) => async (dispatch) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const productData = {
      shopname: shopname,
    };
    const { data } = await axios.post(
      `/api/shopname/getshopcategory`,
      productData,
      config
    );

    dispatch({ type: GET_CATEGORY_SUCCESS, payload: data.results });
  } catch (error) {
    dispatch({
      type: GET_CATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
