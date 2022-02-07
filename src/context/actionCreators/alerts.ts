import actionTypes from "../actionTypes";

export const displayAlert = (dispatch: any) => {
  dispatch({ type: actionTypes.DISPLAY_ALERT });
  clearAlert(dispatch);
};

export const clearAlert = (dispatch: any) => {
  setTimeout(() => {
    dispatch({ type: actionTypes.CLEAR_ALERT });
  }, 3000);
};
