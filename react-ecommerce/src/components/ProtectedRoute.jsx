import React from "react";

import { useContext } from "react";

import { Navigate } from "react-router-dom";

import AuthContext from "../context/AuthContext";


const ProtectedRoute = ({ children }) => {

  const { user, loading } = useContext(AuthContext);


  // Wait until localStorage check is complete
  if (loading) {
    return <h2>Checking authentication...</h2>;
  }


  // User is not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }


  // User is logged in
  return children;
};


export default ProtectedRoute;