import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  //  const isAuthenticated = !!localStorage.getItem("token"); // Example: Check if token exists
  return isAuthenticated() ? (
    children
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
