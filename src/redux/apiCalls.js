import { loginFailure, logingSuccess, loginStart } from "./userRedux";
import { publicRequest, userRequest } from "../requestedMethods";
import {
    getProductFailure,
    getProductStart,
    getProductSuccess,
    deleteProductStart,
    deleteProductSuccess,
    deleteProductFailure,
    updateProductStart,
    updateProductSuccess,
    updateProductFailure,
    addProductStart,
    addProductSuccess,
    addProductFailure,
} from "./productRedux";

export const login = async (dispatch, user) => {
    dispatch(loginStart());

    try {
        const res = await publicRequest.post("/auth/login", user);
        // console.log(res.data);
        dispatch(logingSuccess(res.data));
    } catch (err) {
        dispatch(loginFailure());
    }
};
export const getProducts = async (dispatch) => {
    dispatch(getProductStart());

    try {
        const res = await publicRequest.get("/products");
        dispatch(getProductSuccess(res.data.products));
    } catch (err) {
        dispatch(getProductFailure());
    }
};
export const deleteProduct = async (dispatch, id) => {
    dispatch(deleteProductStart());

    try {
        const res = await userRequest.delete(`/products/${id}`);
        dispatch(deleteProductSuccess(id));
    } catch (err) {
        dispatch(deleteProductFailure());
    }
};
export const updateProduct = async (dispatch, id, product) => {
    dispatch(updateProductStart());

    try {
        const res = await userRequest.put(`/products/${id}`, { product });
        dispatch(updateProductSuccess({ id, product }));
    } catch (err) {
        dispatch(updateProductFailure());
    }
};
export const addProduct = async (dispatch, product) => {
    dispatch(addProductStart());

    try {
        const res = await userRequest.post(`/products`, product);
        dispatch(addProductSuccess(res.data));
    } catch (err) {
        dispatch(addProductFailure());
    }
};
