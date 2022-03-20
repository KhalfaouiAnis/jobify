import { ReducerAction, AppContextState } from "../models";

import { jobActionTypes } from "../actionTypes";
import JobInterface from "../../interfaces/JobInterface";

const reducer = (
  state: AppContextState,
  action: ReducerAction
): AppContextState => {
  if (
    action.type === jobActionTypes.EDIT_JOB_BEGIN ||
    action.type === jobActionTypes.CREATE_JOB_BEGIN
  ) {
    return {
      ...state,
      isLoading: true,
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

  throw new Error(`No such action: ${action.type}`);
};

export default reducer;
