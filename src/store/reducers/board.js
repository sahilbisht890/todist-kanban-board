const initialState = {
    boardList: null,
    boardLoading:true
  };
  
  export const boardReducer = (state = initialState, action) => {
    switch (action.type) {
      case "REQUEST_BOARD_LIST": 
      return {
        ...state,
        boardLoading:true
      };
      case "FETCH_BOARDS_SUCCESS":
        return {
          ...state,
          boardList: action.payload,
          boardLoading:false
        };
      case "FETCH_BOARDS_FAIL":
        return {
          ...state,
          boardLoading:false,
          boardList:[]
        };
      default:
        return state;
    }
  };
  