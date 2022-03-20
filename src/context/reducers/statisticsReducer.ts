import { ReducerAction, AppContextState } from "../models";

import { statisticsActionTypes } from "../actionTypes";

const reducer = (
  state: AppContextState,
  action: ReducerAction
): AppContextState => {
  if (action.type === statisticsActionTypes.SHOW_STATS_BEGIN) {
    return {
      ...state,
      isLoading: true,
      showAlert: false,
    };
  }

  if (action.type === statisticsActionTypes.SHOW_STATS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      stats: action.payload.stats,
      monthlyApplications: action.payload.monthlyApplications,
    };
  }

  throw new Error(`No such action: ${action.type}`);
};

export default reducer;
