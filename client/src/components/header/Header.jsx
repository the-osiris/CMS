import React, { useContext } from "react";
import { authContext } from "../../context/AuthContext";
function Header() {
  const { user, token, dispatch } = useContext(authContext);
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="bg-blue-500 flex justify-end px-4 py-2">
      {user && token && (
        <button
          onClick={handleLogout}
          className="text-white hover:underline underline-offset-4"
        >
          SignOut
        </button>
      )}
    </div>
  );
}

export default Header;
