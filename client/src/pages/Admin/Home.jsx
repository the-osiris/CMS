/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Dashboard from "../../components/Admin/Dashboard/Dashboard";
import Student from "../../components/Admin/Student/Student";
import Faculty from "../../components/Admin/Faculty/Faculty";
import Account from "../../components/Admin/Account/Account";
import Setting from "../../components/Admin/Setting/Setting";

import { LuLayoutDashboard } from "react-icons/lu";
import { PiStudent } from "react-icons/pi";
import { GiTeacher } from "react-icons/gi";
import { MdAccountBalance } from "react-icons/md";
import { CiSettings } from "react-icons/ci";

function Home() {
  const [active, setActive] = useState("dashboard");

  const renderComponent = () => {
    switch (active) {
      case "dashboard":
        return <Dashboard />;
      case "student":
        return <Student />;
      case "faculty":
        return <Faculty />;
      case "account":
        return <Account />;
      case "setting":
        return <Setting />;
      default:
        return <Dashboard />;
    }
  };
  return (
    <div className="bg-[#E7E6E6] w-full h-screen flex">
      <div className="bg-white h-screen p-2 flex flex-col justify-between items-center text-4xl">
        <div className="flex flex-col items-center gap-5">
          <div
            className={
              active == "dashboard"
                ? "bg-black p-2 flex items-center justify-center text-white text-2xl rounded-[50%]"
                : ""
            }
          >
            <LuLayoutDashboard />
          </div>
          <div
            className={
              active == "student"
                ? "bg-black p-2 flex items-center justify-center text-white text-2xl rounded-[50%]"
                : ""
            }
          >
            <PiStudent />
          </div>
          <div
            className={
              active == "faculty"
                ? "bg-black p-2 flex items-center justify-center text-white text-2xl rounded-[50%]"
                : ""
            }
          >
            <GiTeacher />
          </div>
          <div
            className={
              active == "account"
                ? "bg-black p-2 flex items-center justify-center text-white text-2xl rounded-[50%]"
                : ""
            }
          >
            <MdAccountBalance />
          </div>
        </div>
        <CiSettings />
      </div>
      <div className="p-2 h-screen w-full">{renderComponent()}</div>
    </div>
  );
}

export default Home;
