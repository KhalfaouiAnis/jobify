import React from "react";
import { createPortal } from "react-dom";
import useConfirm from "../../hooks/useConfirm";
import "./confirm.css";

const ConfirmDialog = () => {
  const { onConfirm, onCancel, confirmState } = useConfirm();

  const portalElement = document.getElementById("portal") as HTMLElement;

  const component = confirmState.show ? (
    <div className="portal-overlay">
      <div className="confirm-dialog">
        <p>{confirmState?.text && confirmState.text}</p>
        <div className="confirm-dialog__footer">
          <div className="btn" onClick={onConfirm}>
            Yes
          </div>
          <div className="portal-btn" onClick={onCancel}>
            Cancel
          </div>
        </div>
      </div>
    </div>
  ) : null;

  return createPortal(component, portalElement);
};
export default ConfirmDialog;
