import { ReducerAction, AppContextState } from "../models";

import { initialState } from "../appContext";
import { appActionTypes } from "../actionTypes";

const reducer = (
  state: AppContextState,
  action: ReducerAction
): AppContextState => {
  if (
    action.type === appActionTypes.AUTH_USER_BEGIN ||
    action.type === appActionTypes.UPDATE_USER_BEGIN
  ) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === appActionTypes.AUTH_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
      showAlert: true,
      alertType: "success",
      alertText: action.payload.alertText,
    };
  }
  if (
    action.type === appActionTypes.AUTH_USER_ERROR ||
    action.type === appActionTypes.UPDATE_USER_ERROR
  ) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.message,
    };
  }

  if (action.type === appActionTypes.LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
      token: "",
      jobLocation: "",
      userLocation: "",
      showSidebar: !state.showSidebar,
    };
  }

  if (action.type === appActionTypes.UPDATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
      showAlert: true,
      alertType: "success",
      alertText: "User profile updated",
    };
  }

  if (action.type === appActionTypes.UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.message,
    };
  }

  throw new Error(`No such action: ${action.type}`);
};

export default reducer;
