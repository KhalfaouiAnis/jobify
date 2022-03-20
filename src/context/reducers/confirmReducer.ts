import { ReducerAction } from "../models";
import actionTypes from "../actionTypes/layoutActionTypes";

export interface ConfirmContextState {
  show: boolean;
  text: string;
}

export const initialState = {
  show: false,
  text: "",
};

const reducer = (
  state = initialState,
  action: ReducerAction
): ConfirmContextState => {
  if (action.type === actionTypes.SHOW_CONFIRM_DIALOG) {
    return {
      show: true,
      text: action.payload.text,
    };
  }
  if (action.type === actionTypes.HIDE_CONFIRM_DIALOG) {
    return initialState;
  }

  throw new Error(`No such action: ${action.type}`);
};

export default reducer;
