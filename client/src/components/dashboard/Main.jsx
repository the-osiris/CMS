import React, { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL } from "../../config";
import * as XLSX from "xlsx";

function Main() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const navigate = useNavigate();
  // console.log(Object.keys(data?.handlers));
  const handleDashboard = async () => {
    try {
      const res = await fetch(`${BASE_URL}/user/getDataForAdmin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ event: id }),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message);
      }
      setData(result.data);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDeleteEvent = async () => {
    try {
      const res = await fetch(`${BASE_URL}/event/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ event: id }),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message);
      }
      navigate("/admin");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const getTime = (participant) => {
    const createdAtDate = new Date(participant);
    const date = createdAtDate.toLocaleDateString();
    const time = createdAtDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const datetime = date + " " + time;
    return datetime;
  };

  const handleDownload = () => {
    const selectedKeys = [
      "BibID",
      "Rname",
      "Rphone",
      "Rrelation",
      "createdAt",
      "Recieved",
    ];
    const wb = XLSX.utils.book_new();

    const participantData = data.total.map((participant) => {
      const receivedItems = data.totalR.find(
        (item) => item["bookingId"] === participant["Booking ID"]
      );
      const participantObj = {};
      Object.assign(participantObj, participant);
      if (receivedItems) {
        selectedKeys.forEach((key) => {
          if (key == "createdAt")
            participantObj[key] = getTime(receivedItems[key]);
          else if (key == "Recieved") participantObj[key] = "Yes";
          else participantObj[key] = receivedItems[key];
        });
      } else {
        selectedKeys.forEach((key) => {
          if (key == "Recieved") participantObj[key] = "No";
          else participantObj[key] = "";
        });
      }
      return participantObj;
    });

    const ws = XLSX.utils.json_to_sheet(participantData);
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "data" + ".xlsx");
  };

  useEffect(() => {
    handleDashboard();
  }, []);

  return (
    <div className="w-full h-full p-5">
      <div className="w-full h-[300px] bg-gray-100 flex justify-between rounded">
        <div className="relative lg:w-[50%] 2xl:w-[30%] h-full">
          {data.totalR && (
            <PieChart
              className=""
              series={[
                {
                  data: [
                    {
                      id: 0,
                      value: data?.totalR.length,
                    },
                    {
                      id: 1,
                      value: data?.total.length - data?.totalR.length,
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
            ></PieChart>
          )}
          {data.totalR && (
            <p className="absolute z-4 top-[135px] left-[120px] text-3xl font-light text-black">
              {((data?.totalR.length / data?.total.length) * 100).toFixed(2)}%
            </p>
          )}
        </div>
        <div className="">
          {data.handlers && (
            <BarChart
              xAxis={[
                {
                  scaleType: "band",
                  data: Object.keys(data.handlers),
                },
              ]}
              series={[{ data: Object.values(data.handlers) }]}
              width={500}
              height={300}
            />
          )}
        </div>
      </div>
      <div className="p-5 flex justify-between">
        <button
          onClick={() => handleDownload()}
          className="bg-blue-500 px-4 py-2 text-white rounded-xl hover:bg-blue-700"
        >
          Download BiB Data
        </button>

        <button
          onClick={() => handleDeleteEvent()}
          className="bg-red-500 px-4 py-2 text-white rounded-xl hover:bg-red-700"
        >
          Delete Event
        </button>
      </div>
    </div>
  );
}

export default Main;
