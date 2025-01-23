import axiosInstance from "../../utils/axios";

export const fetchBoardsList = () => async (dispatch) => {
  try {
    dispatch({ type: "REQUEST_BOARD_LIST"});
    const response = await axiosInstance.get("/boards");
    dispatch({ type: "FETCH_BOARDS_SUCCESS", payload: response.data.data });
  } catch (error) {
    dispatch({ type: "FETCH_BOARDS_FAIL", payload: [] });
  }
};

