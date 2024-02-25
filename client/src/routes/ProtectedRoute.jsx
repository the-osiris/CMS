/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { authContext } from "../context/AuthContext";

import { BASE_URL } from "../config";

const ProtectedRoute = ({ children }) => {
  let { token, user, dispatch } = useContext(authContext);

  if (token == "null") {
    token = null;
  }

  const handleCheckHandler = async () => {
    if(token === null) return;
    try {
      const res = await fetch(`${BASE_URL}/user/isUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user._id }),
      });
      if (!res.ok) {
        dispatch({ type: "LOGOUT" });
      }
    } catch (err) {
      console.log(err)
    }
  };

  useEffect(() => {
    handleCheckHandler();
  });

  const accessibleRoute = token ? (
    children
  ) : (
    <Navigate to="/login" replace={true} />
  );

  return accessibleRoute;
};

export default ProtectedRoute;
