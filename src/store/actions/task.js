import axiosInstance from "../../utils/axios";

export const fetchTasksList = (boardId) => async (dispatch) => {
  try {
    dispatch({type:"REQUEST_TASKS_LIST"});
    const response = await axiosInstance.get(`/tasks/list?boardId=${boardId}`);
    dispatch({ type: "FETCH_TASKS_SUCCESS", payload: response.data.data });
  } catch (error) {
    dispatch({ type: "FETCH_TASKS_FAIL", payload: []});
  }
};
