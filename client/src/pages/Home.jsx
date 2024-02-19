import React, { useContext, useEffect, useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { Link, useRoutes } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL } from "../config";
import { authContext } from "../context/AuthContext";

function Home() {
  const [eventList, setEventList] = useState([]);
  const { user } = useContext(authContext);
  useEffect(() => {
    handleEventsLoad();
  }, []);

  const handleEventsLoad = async () => {
    // console.log(user._id);
    try {
      const res = await fetch(`${BASE_URL}/event/getEvents`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user._id }),
      });

      const result = await res.json();
      // console.log(result);
      if (!res.ok) {
        throw new Error(result.message);
      }
      setEventList(result.data);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleAddEvent = () => {
    console.log(eventList.length);
  };
  return (
    <div className="h-screen flex flex-col">
      <div className="h-[40%] md:h-[30%] w-full bg-gray-200 flex items-center gap-5 p-4">
        <div className=""></div>
        <Link to="/admin/create">
          <div className="relative w-[150px] h-[200px] bg-white rounded-xl flex items-center justify-center hover:scale-105 transition-all duration-300 mx-5">
            <IoMdAddCircle className="text-blue-500 text-5xl h-fit" />
            <p className="absolute bottom-1 text-gray-400">Add Event</p>
          </div>
        </Link>
      </div>
      <div className="h-[60%] md:h-[70%] w-full p-4">
        <h1 className=" text-center text-xl font-semibold text-gray-500 uppercase underline underline-offset-8">
          Your Events
        </h1>
        {eventList.length == 0 ? (
          <p className="text-center my-5 text-gray-400">
            No event added. Add Now!
          </p>
        ) : (
          <div className="grid grid-cols-5 p-5 gap-5">
            {eventList.map((event, index) => {
              return (
                <div
                  key={index}
                  className="bg-gray-100  min-w-[150px] rounded p-2 flex flex-col gap-5"
                >
                  <div className="">
                    <h1 className="text-center text-xl uppercase font-semibold">
                      {event.name}
                    </h1>
                    <p className="text-end text-gray-500">-{event.organizer}</p>
                  </div>
                  <div className="">
                    <div className="flex items-center gap-3">
                      <p>Participants Number: {event.participants.length}</p>
                    </div>
                    <div className="">
                      <p>Handler Accounts: {event.handlers.length}</p>
                    </div>
                  </div>
                  <div className="">
                    <Link to={`/admin/${event._id}`}>
                      <button className="w-full bg-blue-500 py-2 rounded text-white focus:outline-none hover:bg-blue-700">
                        Dashboard
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
