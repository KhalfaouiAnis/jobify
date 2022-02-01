import { DISPLAY_ALERT, CLEAR_ALERT } from "../actions";

export const displayAlert = (dispatch: any) => {
  dispatch({ type: DISPLAY_ALERT });
  clearAlert(dispatch);
};

export const clearAlert = (dispatch: any) => {
  setTimeout(() => {
    dispatch({ type: CLEAR_ALERT });
  }, 3000);
};
