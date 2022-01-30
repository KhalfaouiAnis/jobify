import { ReducerAction, AppContextState } from "./models";
import { DISPLAY_ALERT, CLEAR_ALERT } from "./actions";

const reducer = (
  state: AppContextState,
  action: ReducerAction
): AppContextState => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: "Please add all values",
    };
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: "",
      alertText: "",
    };
  }
  throw new Error(`No such action: ${action.type}`);
};

export default reducer;
