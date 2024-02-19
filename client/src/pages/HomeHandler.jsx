import React, { useContext, useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { PiCaretCircleDoubleUpFill } from "react-icons/pi";

import Menu from "../components/handler/Menu";
import { authContext } from "../context/AuthContext";
import { BASE_URL } from "../config";
// bg-[#fef8e7]
function HomeHandler() {
  // const [active, setActive] = useState("/");
  const { user } = useContext(authContext);
  const [data, setData] = useState({
    bibRecieved: 0,
    bibRecievedByMe: [],
    totalParticipant: 0,
  });

  const getTime = (participant) => {
    const createdAtDate = new Date(participant.createdAt);
    const date = createdAtDate.toLocaleDateString();
    const time = createdAtDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const datetime = date + " " + time;
    return datetime;
  };

  const handleGetData = async () => {
    try {
      const res = await fetch(`${BASE_URL}/user/getCurrentData`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message);
      }
      // console.log(result.data);
      setData({
        bibRecieved: result.data.all,
        bibRecievedByMe: result.data.own,
        totalParticipant: result.data.total,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleGetData();
  }, []);

  // useEffect(() => {
  //   setActive(location.pathname);
  // }, [location]);

  return (
    <div className="flex ">
      <Menu />
      <div className="w-full p-5 flex flex-col gap-4">
        <h1 className="text-3xl text-center font-semibold w-full">Dashboard</h1>
        <div className="h-[300px] w-full bg-gray-100 rounded-xl flex">
          <div className="w-[50%] h-full">
            <PieChart
              series={[
                {
                  data: [
                    {
                      id: 0,
                      value: data.bibRecievedByMe.length,
                      label: "BIB Provided by me",
                    },
                    {
                      id: 1,
                      value: data.bibRecieved,
                      label: "Total BiB Provided",
                    },
                  ],
                  innerRadius: 85,
                  outerRadius: 100,
                  paddingAngle: 5,
                  cornerRadius: 5,
                  startAngle: -90,
                  endAngle: 180,
                  cx: 150,
                  cy: 150,
                },
              ]}
            />
          </div>
          <div className="w-[50%] flex justify-end items-center p-10 ">
            <div className="bg-white rounded w-[250px] h-full flex flex-col p-5">
              <div className="flex items-center justify-between">
                <h1 className="text-4xl font-light text-center  ">
                  {((data.bibRecieved / data.totalParticipant) * 100).toFixed(
                    2
                  )}
                  %
                </h1>
                <PiCaretCircleDoubleUpFill className="text-4xl text-[#02b2af] " />
              </div>
              <div className="">
                <div className="flex flex-col items-center text-gray-500">
                  <h1 className="text-xl text-center w-fit p-2 mt-2 border-[1px] border-black rounded">
                    {data.totalParticipant}
                  </h1>
                  <p>Total Participants</p>
                </div>
                <div className="flex flex-col items-center text-gray-500">
                  <h1 className="text-xl text-center w-fit p-2 mt-2 border-[1px] border-black rounded">
                    {data.totalParticipant - data.bibRecieved}
                  </h1>
                  <p>Participants Left</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h1 className=" bg-white text-2xl">History</h1>
        <div className=" h-[400px] 2xl:h-[500px] overflow-y-auto w-full px-5">
          {data.bibRecievedByMe.map((particpant, index) => {
            return (
              <div
                key={index}
                className="w-full bg-black text-white my-2 p-2 grid grid-cols-6 items-center"
              >
                <p>{particpant.bookingId}</p>
                <p>{particpant.Rname}</p>
                <p>{particpant.Rphone}</p>
                <p>{particpant.Rrelation}</p>
                <p>{getTime(particpant)}</p>
                <p>{particpant.BibID}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default HomeHandler;
