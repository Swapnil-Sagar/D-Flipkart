import axios from "../helpers/axios";
import { categoryConstansts } from "./constants";

export const getAllCategory = () => {
  return async (dispatch) => {
    dispatch({ type: categoryConstansts.GET_ALL_CATEGORIES_REQUEST });
    const res = await axios.get(`category/getcategory`);
    console.log(res);
    if (res.status === 200) {
      const { categoryList } = res.data;

      dispatch({
        type: categoryConstansts.GET_ALL_CATEGORIES_SUCCESS,
        payload: { categories: categoryList },
      });
    } else {
      dispatch({
        type: categoryConstansts.GET_ALL_CATEGORIES_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};

// export const updateCategories = (form) => {
//   return async (dispatch) => {
//     dispatch({ type: categoryConstansts.UPDATE_CATEGORIES_REQUEST });
//     const res = await axios.post(`/category/update`, form);
//     if (res.status === 201) {
//       dispatch({ type: categoryConstansts.UPDATE_CATEGORIES_SUCCESS });
//       dispatch(getAllCategory());
//     } else {
//       const { error } = res.data;
//       dispatch({
//         type: categoryConstansts.UPDATE_CATEGORIES_FAILURE,
//         payload: { error },
//       });
//     }
//   };
// };

// export const deleteCategories = (ids) => {
//   return async (dispatch) => {
//     dispatch({ type: categoryConstansts.DELETE_CATEGORIES_REQUEST });
//     const res = await axios.post(`/category/delete`, {
//       payload: {
//         ids,
//       },
//     });
//     if (res.status == 201) {
//       dispatch(getAllCategory());
//       dispatch({ type: categoryConstansts.DELETE_CATEGORIES_SUCCESS });
//     } else {
//       const { error } = res.data;
//       dispatch({
//         type: categoryConstansts.DELETE_CATEGORIES_FAILURE,
//         payload: { error },
//       });
//     }
//   };
// };

// export { getAllCategory };
