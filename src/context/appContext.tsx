import React, { useReducer, useContext, Fragment } from "react";
import axios from "axios";
import reducer from "./reducers";
import { AppContextState, AppContextProps } from "./models";
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
} from "./actions";
import { API_VERSION } from "../shared/url";
import Auth from "../interfaces/Auth";

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
  user: user ? JSON.parse(user) : null,
  token: token || "",
  userLocation: userLocation || "",
  jobLocation: userLocation || "",
  showSidebar: false,
};

const AppContext = React.createContext(initialState);

const AppProvider = ({ children }: AppContextProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

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
      //console.log(error.response);
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

  return (
    <AppContext.Provider
      value={{ ...state, displayAlert, authUser, toggleSidebar, logoutUser }}
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
