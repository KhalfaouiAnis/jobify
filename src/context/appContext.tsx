import React, { useReducer, useContext, Fragment } from "react";
import axios from "axios";
import reducer from "./reducers";
import { AppContextState, AppContextProps, HCProps } from "./models";
import {
  saveUserToLocalStorage,
  removeUserFromLocalStorage,
} from "../utils/localStorage";

import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  AUTH_USER_BEGIN,
  AUTH_USER_SUCCESS,
  AUTH_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_JOB_BEGIN,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR,
  GET_JOBS_BEGIN,
  GET_JOBS_SUCCESS,
  DELETE_JOB_END,
  DELETE_JOB_BEGIN,
  EDIT_JOB_ERROR,
  EDIT_JOB_SUCCESS,
  EDIT_JOB_BEGIN,
  SET_EDIT_JOB,
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  CLEAR_FILTERS,
} from "./actions";
import { API_VERSION } from "../shared/url";
import Auth from "../interfaces/Auth";
import User from "../interfaces/User";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
const userLocation = localStorage.getItem("location");

const initialState: AppContextState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  displayAlert: () => {},
  authUser: () => {},
  toggleSidebar: () => {},
  logoutUser: () => {},
  updateUser: () => {},
  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: userLocation || "",
  showSidebar: false,

  //job context
  isEditing: false,
  editJobId: "",
  position: "",
  company: "",
  jobLocation: userLocation || "",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOptions: ["interview", "declined", "pending", "approuved"],
  status: "pending",

  //Job context: get jobs
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,

  // Search & Sort jobs
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],

  clearFilters: () => {},

  getJobs: () => {},
  setEditJob: () => {},
  editJob: () => {},
  deleteJob: () => {},

  stats: {
    pending: 0,
    declined: 0,
    interview: 0,
  },
  monthlyApplications: [],
  showStats: () => {},

  handleChange: () => {},
  clearValues: () => {},
  createJob: () => {},
};

const AppContext = React.createContext(initialState);

const AppProvider = ({ children }: AppContextProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // axios
  //axios.defaults.headers.common["Authorization"] = `Bearer ${state.token}`;

  const authFetch = axios.create({
    baseURL: `/api/v${API_VERSION}`,
    headers: {
      Authorization: `Bearer ${state.token}`,
    },
  });

  //request
  // authFetch.interceptors.request.use(
  //   async (config: AxiosRequestConfig) => {
  //     if (config.headers === undefined) {
  //       config.headers = {};
  //     }
  //     if (token) {
  //       config.headers["Authorization"] = `Bearer ${token}`;
  //     } else {
  //       delete config.headers["Authorization"];
  //     }
  //     return config;
  //   },
  //   (error) => {
  //     return Promise.reject(error);
  //   }
  // );

  //response
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const authUser = async ({ currentUser, endPoint, alertText }: Auth) => {
    dispatch({ type: AUTH_USER_BEGIN });
    try {
      const { data } = await axios.post(
        `/api/v${API_VERSION}/auth/${endPoint}`,
        currentUser
      );
      const { user, token, location } = data;
      dispatch({
        type: AUTH_USER_SUCCESS,
        payload: { user, token, location, alertText },
      });
      saveUserToLocalStorage({ user, token, location });
    } catch (error) {
      dispatch({
        type: AUTH_USER_ERROR,
        payload: { message: error.response.data.message },
      });
    }
    clearAlert();
  };

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };

  const updateUser = async (currentUser: User) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const { data } = await authFetch.patch(`/auth/updateUser`, currentUser);
      const { user, location, token } = data;
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, location, token },
      });
      saveUserToLocalStorage({ user, location, token });
    } catch (error) {
      console.log("error update: ", error);
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { message: error.response.data.message },
        });
      }
    }
    clearAlert();
  };

  const handleChange = ({ name, value }: HCProps) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };

  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };

  const createJob = async () => {
    dispatch({ type: CREATE_JOB_BEGIN });
    try {
      const { position, company, jobLocation, jobType, status } = state;
      await authFetch.post(`/jobs/`, {
        position,
        company,
        jobLocation,
        jobType,
        status,
      });
      dispatch({ type: CREATE_JOB_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_JOB_ERROR,
        payload: { message: error.response.data.message },
      });
    }
    clearAlert();
  };

  const getJobs = async () => {
    const { search, searchStatus, searchType, sort } = state;

    let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}`;

    if (search) {
      url = url + `&search=${search}`;
    }

    dispatch({ type: GET_JOBS_BEGIN });

    try {
      const { data } = await authFetch(url);
      const { jobs, totalJobs, numOfPages } = data;

      dispatch({
        type: GET_JOBS_SUCCESS,
        payload: {
          jobs,
          totalJobs,
          numOfPages,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  const setEditJob = (id: string) => {
    dispatch({ type: SET_EDIT_JOB, payload: id });
  };

  const editJob = async () => {
    dispatch({ type: EDIT_JOB_BEGIN });
    try {
      const {
        position,
        company,
        jobLocation,
        jobType,
        status,
        editJobId,
      } = state;

      await authFetch.patch(`/jobs/${editJobId}`, {
        position,
        company,
        jobLocation,
        jobType,
        status,
      });

      dispatch({ type: EDIT_JOB_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_JOB_ERROR,
        payload: { message: error.response.data.message },
      });
    }
    clearAlert();
  };

  const deleteJob = async (jobId: string) => {
    dispatch({ type: DELETE_JOB_BEGIN, payload: jobId });
    try {
      await authFetch.delete(`/jobs/${jobId}`);
      dispatch({ type: DELETE_JOB_END });
    } catch (error) {
      console.log("Delete job error: ", error);
      logoutUser();
    }
  };

  const showStats = async () => {
    dispatch({ type: SHOW_STATS_BEGIN });
    try {
      const { data } = await authFetch("/jobs/stats");
      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: {
          stats: data.defaultStats,
          monthlyApplications: data.monthlyApplications,
        },
      });
    } catch (err) {
      logoutUser();
    }
    clearAlert();
  };

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        authUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        handleChange,
        clearValues,
        createJob,
        getJobs,
        setEditJob,
        editJob,
        deleteJob,
        showStats,
        clearFilters,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

AppProvider.defaultProps = {
  children: <Fragment />,
};

export { AppProvider, initialState, useAppContext };
