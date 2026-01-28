import axiosInstance from "../../utils/axios";

export const loginUser = (userData) => async (dispatch) => {
  try {
    const response = await axiosInstance.post("/auth/login", userData);
    const { accessToken, user } = response.data;

    dispatch({
      type: "USER_LOGIN_SUCCESS",
      payload: user,
    });

    return user; // optional: allow chaining
  } catch (error) {
    const errorPayload =
      error.response?.data?.message || error.message || "Login failed";

    dispatch({
      type: "USER_LOGIN_FAIL",
      payload: errorPayload,
    });

    // IMPORTANT: rethrow error
    throw errorPayload;
  }
};


export const logoutUser = () => async (dispatch) => {
  try {
    const respone = await axiosInstance.get('/auth/logout');
    dispatch({ type: "USER_LOGOUT" });
  } catch (err) {
    console.log('Error while logging out' , err); 
  }
};

export const checkAuthentication = () => async (dispatch) => {
  try {
    const response = await axiosInstance.get("/auth/check-auth");
    const { accessToken, user } = response.data;
    dispatch({ type: "USER_LOGIN_SUCCESS", payload: user });
  } catch (error) {
    dispatch({ type: "USER_LOGIN_FAIL", payload: error.response?.data || error.message });
  }
};

export const refreshAccessToken = () => async (dispatch) => {
  try {
    const response = await axiosInstance.get("/auth/refresh-token");
    const { accessToken, user } = response.data;
    dispatch({ type: "USER_LOGIN_SUCCESS", payload: user });
  } catch (error) {
    dispatch({ type: "USER_LOGIN_FAIL", payload: error.response?.data || error.message });
  }
};
