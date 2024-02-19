import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
function Menu() {
  const [active, setActive] = useState("/");
  const location = useLocation();

  useEffect(() => {
    setActive(location.pathname);
  }, [location]);
  return (
    <div className="w-[300px] h-screen bg-black text-white flex flex-col items-center">
      <ul className="my-10 flex flex-col gap-10">
        <Link to="/">
          <li
            className={
              active == "/"
                ? "text-lg text-center border-white border-[1px] py-2 px-9 rounded-xl bg-white text-black"
                : "text-lg text-center bg-transparent border-white border-[1px] py-2 px-9 rounded-xl hover:bg-white hover:text-black"
            }
          >
            Dashboard
          </li>
        </Link>
        <Link to="/panel">
          <li
            className={
              active == "/panel"
                ? "text-lg text-center border-white border-[1px] py-2 px-9 rounded-xl bg-white text-black"
                : "text-lg text-center bg-transparent border-white border-[1px] py-2 px-9 rounded-xl hover:bg-white hover:text-black"
            }
          >
            Panel
          </li>
        </Link>
      </ul>
    </div>
  );
}

export default Menu;
