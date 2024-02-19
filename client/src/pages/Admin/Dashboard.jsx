import React, { useState } from "react";
import { Link } from "react-router-dom";
import Main from "../../components/dashboard/Main";
import Setting from "../../components/dashboard/Setting";
import { toast } from "react-toastify";

function Dashboard() {
  const [active, setActive] = useState("dashboard");

  return (
    <div className="flex">
      <div className="w-[300px] h-screen bg-black flex flex-col items-center p-5">
        <div className="flex items-center w-full p-5 justify-start ">
          <Link to="/admin" className="w-fit h-fit ">
            <p className="text-white   hover:text-gray-500">Back</p>
          </Link>
        </div>
        <ul className="flex flex-col gap-4">
          <li
            onClick={() => {
              setActive("dashboard");
            }}
            className={
              active == "dashboard"
                ? "cursor-pointer w-[200px] p-2 border-[1px] border-white rounded text-black text-center bg-white "
                : "cursor-pointer w-[200px] p-2 border-[1px] border-white rounded text-white text-center "
            }
          >
            Dashboard
          </li>
          <li
            onClick={() => {
              toast.error("Feature Not Available Currently");
            }}
            className={
              active == "setting"
                ? "cursor-pointer w-[200px] p-2 border-[1px] border-white rounded text-black text-center bg-white "
                : "cursor-pointer w-[200px] p-2 border-[1px] border-white rounded text-white text-center "
            }
          >
            Settings
          </li>
        </ul>
      </div>
      <div className="w-full">
        {active == "dashboard" ? <Main /> : <Setting />}
      </div>
    </div>
  );
}

export default Dashboard;
