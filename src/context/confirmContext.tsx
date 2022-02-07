import React, { useReducer, useContext, Fragment } from "react";
import reducer from "./reducers/confirmReducer";
import { AppContextProps } from "./models";

const initialState = {
  show: false,
  text: "",
};

const ConfirmContext = React.createContext({});

const ConfirmContextProvider = ({ children }: AppContextProps) => {
  const [state, confirmDispatch] = useReducer(reducer, initialState);

  return (
    <ConfirmContext.Provider value={[state, confirmDispatch]}>
      {children}
    </ConfirmContext.Provider>
  );
};

const useConfirmContext = () => {
  return useContext(ConfirmContext);
};

ConfirmContextProvider.defaultProps = {
  children: <Fragment />,
};

export {
  ConfirmContextProvider,
  ConfirmContext,
  initialState,
  useConfirmContext,
};
