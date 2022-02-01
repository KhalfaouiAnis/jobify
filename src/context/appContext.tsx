import React, { useReducer, useContext, Fragment } from "react";
import axios from "axios";
import reducer from "./reducers";
import { AppContextState, AppContextProps } from "./models";
import { saveUserToLocalStorage } from "../utils/localStorage";
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
} from "./actions";
import User from "../interfaces/User";
import { API_VERSION } from "../shared/url";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
const userLocation = localStorage.getItem("location");

const initialState: AppContextState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  displayAlert: () => {},
  registerUser: () => {},
  user: user ? JSON.parse(user) : null,
  token: token || "",
  userLocation: userLocation || "",
  jobLocation: userLocation || "",
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

  const registerUser = async (currentUser: User) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      const response = await axios.post(
        `/api/v${API_VERSION}/auth/register`,
        currentUser
      );
      const { user, token, location } = response.data;
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: { user, token, location },
      });
      saveUserToLocalStorage({ user, token, location });
    } catch (error) {
      //console.log(error.response);
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { message: error.response.data.message },
      });
    }
    clearAlert();
  };

  return (
    <AppContext.Provider value={{ ...state, displayAlert, registerUser }}>
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
