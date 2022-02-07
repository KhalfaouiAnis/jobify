import { useConfirmContext, ConfirmContext } from "../context/confirmContext";
import actionTypes from "../context/actionTypes/confirmActionTypes";
import { useContext } from "react";

let resolveCallback: any;
function useConfirm() {
  const [confirmState, confirmDispatch]: any = useContext(ConfirmContext);

  const onConfirm = () => {
    closeConfirm();
    resolveCallback(true);
  };

  const onCancel = () => {
    closeConfirm();
    resolveCallback(false);
  };

  const confirm = (text: string) => {
    confirmDispatch({
      type: actionTypes.SHOW_CONFIRM_DIALOG,
      payload: {
        text,
      },
    });
    return new Promise((res, rej) => {
      resolveCallback = res;
    });
  };

  const closeConfirm = () => {
    confirmDispatch({
      type: actionTypes.HIDE_CONFIRM_DIALOG,
    });
  };

  return { confirm, onConfirm, onCancel, confirmState };
}

export default useConfirm;
