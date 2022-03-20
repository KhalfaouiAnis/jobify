import { ReducerAction, AppContextState } from "../models";

import { layoutActionTypes } from "../actionTypes";

const reducer = (
  state: AppContextState,
  action: ReducerAction
): AppContextState => {
  if (action.type === layoutActionTypes.DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: "Please provide all values",
    };
  }
  if (action.type === layoutActionTypes.CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: "",
      alertText: "",
    };
  }

  if (action.type === layoutActionTypes.TOGGLE_SIDEBAR) {
    return {
      ...state,
      showSidebar: !state.showSidebar,
    };
  }

  if (action.type === layoutActionTypes.HANDLE_CHANGE) {
    return {
      ...state,
      [action.payload.name]: action.payload.value,
    };
  }

  if (action.type === layoutActionTypes.CLEAR_VALUES) {
    const initialState = {
      isEditing: false,
      editJobId: "",
      position: "",
      company: "",
      jobLocation: state.userLocation || "",
      jobType: "full-time",
      status: "pending",
    };
    return {
      ...state,
      ...initialState,
    };
  }

  if (action.type === layoutActionTypes.CLEAR_FILTERS) {
    return {
      ...state,
      search: "",
      searchStatus: "all",
      searchType: "all",
      sort: "latest",
    };
  }
  if (action.type === layoutActionTypes.CHANGE_PAGE) {
    return { ...state, page: action.payload.page };
  }

  throw new Error(`No such action: ${action.type}`);
};

export default reducer;
