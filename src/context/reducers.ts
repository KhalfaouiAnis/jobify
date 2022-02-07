import { ReducerAction, AppContextState } from "./models";
import actionTypes from "./actionTypes";

import { initialState } from "./appContext";
import JobInterface from "../interfaces/JobInterface";

const reducer = (
  state: AppContextState,
  action: ReducerAction
): AppContextState => {
  if (action.type === actionTypes.DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: "Please provide all values",
    };
  }
  if (action.type === actionTypes.CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: "",
      alertText: "",
    };
  }
  if (
    action.type === actionTypes.AUTH_USER_BEGIN ||
    action.type === actionTypes.UPDATE_USER_BEGIN ||
    action.type === actionTypes.EDIT_JOB_BEGIN ||
    action.type === actionTypes.CREATE_JOB_BEGIN
  ) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === actionTypes.AUTH_USER_SUCCESS) {
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
    action.type === actionTypes.AUTH_USER_ERROR ||
    action.type === actionTypes.UPDATE_USER_ERROR
  ) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.message,
    };
  }
  if (action.type === actionTypes.TOGGLE_SIDEBAR) {
    return {
      ...state,
      showSidebar: !state.showSidebar,
    };
  }
  if (action.type === actionTypes.LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
      token: "",
      jobLocation: "",
      userLocation: "",
      showSidebar: !state.showSidebar,
    };
  }

  if (action.type === actionTypes.UPDATE_USER_SUCCESS) {
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

  if (action.type === actionTypes.UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.message,
    };
  }

  if (action.type === actionTypes.HANDLE_CHANGE) {
    return {
      ...state,
      [action.payload.name]: action.payload.value,
    };
  }

  if (action.type === actionTypes.CLEAR_VALUES) {
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

  if (action.type === actionTypes.CREATE_JOB_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "New job created",
    };
  }

  if (
    action.type === actionTypes.CREATE_JOB_ERROR ||
    action.type === actionTypes.EDIT_JOB_ERROR
  ) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.message,
    };
  }

  if (action.type === actionTypes.GET_JOBS_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }

  if (action.type === actionTypes.GET_JOBS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      jobs: action.payload.jobs,
      totalJobs: action.payload.totalJobs,
      numOfPages: action.payload.numOfPages,
    };
  }

  if (action.type === actionTypes.SET_EDIT_JOB) {
    const job: JobInterface = state.jobs.find(
      (job) => job._id === action.payload
    );
    const { _id, position, company, jobLocation, jobType, status } = job;
    return {
      ...state,
      isEditing: true,
      editJobId: _id,
      position,
      company,
      jobLocation,
      jobType,
      status,
    };
  }

  if (action.type === actionTypes.EDIT_JOB_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Job updated",
    };
  }

  if (action.type === actionTypes.DELETE_JOB_BEGIN) {
    return {
      ...state,
      isLoading: true,
      jobs: state.jobs.filter((job) => job._id !== action.payload),
    };
  }

  if (action.type === actionTypes.DELETE_JOB_END) {
    return {
      ...state,
      isLoading: false,
    };
  }

  if (action.type === actionTypes.SHOW_STATS_BEGIN) {
    return {
      ...state,
      isLoading: true,
      showAlert: false,
    };
  }
  if (action.type === actionTypes.SHOW_STATS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      stats: action.payload.stats,
      monthlyApplications: action.payload.monthlyApplications,
    };
  }
  if (action.type === actionTypes.CLEAR_FILTERS) {
    return {
      ...state,
      search: "",
      searchStatus: "all",
      searchType: "all",
      sort: "latest",
    };
  }
  if (action.type === actionTypes.CHANGE_PAGE) {
    return { ...state, page: action.payload.page };
  }

  throw new Error(`No such action: ${action.type}`);
};

export default reducer;
