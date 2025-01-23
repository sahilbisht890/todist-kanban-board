const initialState = {
    userInfo: null,
    isAuthenticated: false,
  };
  
  export const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case "USER_LOGIN_SUCCESS":
        return {
          ...state,
          userInfo: action.payload,
          isAuthenticated: true,
        };
      case "USER_LOGIN_FAIL":
        return {
          ...state,
          isAuthenticated: false,
        };
      case "USER_LOGOUT":
        return {
          ...state,
          userInfo: null,
          isAuthenticated: false,
        };
      default:
        return state;
    }
  };
  