import { userReducer } from "./user";
import { boardReducer } from "./board";
import { taskReducer } from "./task";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  user: userReducer,
  boards: boardReducer,
  tasks: taskReducer,
});


export default rootReducer;
