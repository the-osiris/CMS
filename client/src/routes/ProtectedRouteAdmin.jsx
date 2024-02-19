import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { authContext } from "../context/AuthContext";

import { BASE_URL } from "../config";

const ProtectedRouteAdmin = ({ children }) => {
  let { token, user, dispatch } = useContext(authContext);

  if (token == "null") {
    token = null;
  }

  const handleCheckAdmin = async () => {
    // console.log(user._id);
    try {
      const res = await fetch(`${BASE_URL}/user/isAdmin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user._id }),
      });
      // console.log(res);
      if (!res.ok) {
        dispatch({ type: "LOGOUT" });
      }
    } catch (err) {
      // toast.error(err.message);
    }
  };

  useEffect(() => {
    handleCheckAdmin();
  });

  const accessibleRoute = token ? (
    children
  ) : (
    <Navigate to="/admin/login" replace={true} />
  );

  return accessibleRoute;
};

export default ProtectedRouteAdmin;
