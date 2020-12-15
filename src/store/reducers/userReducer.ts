import store from "../store";

import { globalState, action } from "../../interface/interfaces";
export const userReducer = (
  state: globalState,
  action: action
): globalState => {
  switch (action.type) {
    case "SETCURRENTUSER":
      var newState = { ...state };
      newState.user = action.payload.user;
      return newState;
    case "LOGIN":
      localStorage.setItem("token", action.payload.token);
      var newState = { ...state };
      newState.user = action.payload.user;
      return newState;
    case "LOGOUT":
      localStorage.removeItem("token");
      var newState = { ...state };
      newState.user = null;
      return newState;
    default:
      return state;
  }
};
