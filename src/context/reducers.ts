import { ReducerAction, AppContextState } from "./models";

import { initialState } from "./appContext";
import JobInterface from "../interfaces/JobInterface";
import {
  layoutActionTypes,
  jobActionTypes,
  appActionTypes,
  statisticsActionTypes,
} from "./actionTypes";

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
  if (
    action.type === appActionTypes.AUTH_USER_BEGIN ||
    action.type === appActionTypes.UPDATE_USER_BEGIN ||
    action.type === jobActionTypes.EDIT_JOB_BEGIN ||
    action.type === jobActionTypes.CREATE_JOB_BEGIN
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
  if (action.type === layoutActionTypes.TOGGLE_SIDEBAR) {
    return {
      ...state,
      showSidebar: !state.showSidebar,
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

  if (action.type === jobActionTypes.CREATE_JOB_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "New job created",
    };
  }

  if (
    action.type === jobActionTypes.CREATE_JOB_ERROR ||
    action.type === jobActionTypes.EDIT_JOB_ERROR
  ) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.message,
    };
  }

  if (action.type === jobActionTypes.GET_JOBS_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }

  if (action.type === jobActionTypes.GET_JOBS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      jobs: action.payload.jobs,
      totalJobs: action.payload.totalJobs,
      numOfPages: action.payload.numOfPages,
    };
  }

  if (action.type === jobActionTypes.SET_EDIT_JOB) {
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

  if (action.type === jobActionTypes.EDIT_JOB_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Job updated",
    };
  }

  if (action.type === jobActionTypes.DELETE_JOB_BEGIN) {
    return {
      ...state,
      isLoading: true,
      jobs: state.jobs.filter((job) => job._id !== action.payload),
    };
  }

  if (action.type === jobActionTypes.DELETE_JOB_END) {
    return {
      ...state,
      isLoading: false,
    };
  }

  if (action.type === statisticsActionTypes.SHOW_STATS_BEGIN) {
    return {
      ...state,
      isLoading: true,
      showAlert: false,
    };
  }
  if (action.type === statisticsActionTypes.SHOW_STATS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      stats: action.payload.stats,
      monthlyApplications: action.payload.monthlyApplications,
    };
  }

  throw new Error(`No such action: ${action.type}`);
};

export default reducer;
