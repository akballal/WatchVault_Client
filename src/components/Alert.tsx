import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  OnClose: () => void;
}

function Alert({ children, OnClose }: Props) {
  return (
    <div
      className="alert alert-warning alert-dismissible fade show"
      role="alert"
    >
      <strong>{children}</strong>
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
        onClick={OnClose}
      ></button>
    </div>
  );
}

export default Alert;
