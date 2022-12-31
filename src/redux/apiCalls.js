import { loginFailure, logingSuccess, loginStart } from "./userRedux";
import { publicRequest } from "../requestedMethods";
import { getProductFailure, getProductStart, getProductSuccess, deleteProductStart, deleteProductSuccess, deleteProductFailure } from "./productRedux";

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
        // const res = await publicRequest.delete(`/products/${id}`);
        dispatch(deleteProductSuccess(id));
    } catch (err) {
        dispatch(deleteProductFailure());
    }
};
