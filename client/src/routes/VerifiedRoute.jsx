import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../config";
import { Navigate, useParams } from "react-router-dom";
// import { authContext } from "../context/AuthContext";

const VerifiedRoute = ({ children }) => {
  const { id, token } = useParams();
  const [verified, setVerified] = useState(null);
  useEffect(() => {
    const verify = async () => {
      try {
        const url = `${BASE_URL}/auth/admin/${id}/verifyroute/${token}`;
        const { data } = await axios.get(url);
        setVerified(true);
      } catch (error) {
        setVerified(false);
      }
    };

    verify();
  }, [id, token]);

  if (verified === null) {
    // Return a loading state or placeholder while waiting for verification
    return <div>Loading...</div>;
  }

  const accessibleRoute = verified ? (
    children
  ) : (
    <Navigate to="/404" replace={true} />
  );
  return accessibleRoute;
};

export default VerifiedRoute;
