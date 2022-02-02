import React from "react";
import { useAppContext } from "../context/appContext";
import { Navigate } from "react-router-dom";

interface PropsShape {
  children: React.ReactElement;
}

const ProtectedRoute = ({ children }: PropsShape) => {
  const { user } = useAppContext();
  if (!user) {
    return <Navigate to="/landing" />;
  }
  return children;
};

export default ProtectedRoute;
