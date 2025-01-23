const initialState = {
  taskList: null,
  taskListLoading: true,
};

export const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REQUEST_TASKS_LIST":
      return {
        ...state,
        taskListLoading: true,
      };
    case "FETCH_TASKS_SUCCESS":
      return {
        ...state,
        taskList: action.payload,
        taskListLoading: false,
      };
    case "FETCH_TASKS_FAIL":
      return {
        ...state,
        taskListLoading: false,
      };
    default:
      return state;
  }
};
