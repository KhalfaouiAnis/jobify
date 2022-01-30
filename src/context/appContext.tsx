import React, { useReducer, useContext, ReactNode, Fragment } from "react";

import reducer from "./reducers";
import { AppContextState } from "./models";
import { DISPLAY_ALERT, CLEAR_ALERT } from "./actions";

interface AppContextProps {
  children: ReactNode;
}

const initialState: AppContextState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  displayAlert: () => {},
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

  return (
    <AppContext.Provider value={{ ...state, displayAlert }}>
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
