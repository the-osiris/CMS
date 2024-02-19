import React, { useState, useEffect, useContext } from "react";
import Menu from "../components/handler/Menu";
import { authContext } from "../context/AuthContext";
import { BASE_URL } from "../config";
import { toast } from "react-toastify";
import Participant from "../components/handler/Participant";

function Panel() {
  const { user } = useContext(authContext);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("phone");
  const [participant, setParticipant] = useState({});

  const handleSearch = async (e) => {
    e.preventDefault();
    // console.log(query, filter);
    try {
      const res = await fetch(`${BASE_URL}/user/findParticipant`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event: user.event,
          query: query,
          filter: filter,
        }),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message);
      }
      toast.success(result.message);
      setParticipant(result.data);
    } catch (err) {
      toast.error(err.message);
      setParticipant({});
    }
  };
  return (
    <div className="flex">
      <Menu />
      <div className="w-full h-screen bg-white p-5 flex flex-col">
        <h1 className="text-center w-full text-3xl uppercase font-semibold">
          Handler Panel
        </h1>
        <div className="my-4 bg-gray-100 rounded w-full  p-5">
          <form className="flex gap-5 items-center" onSubmit={handleSearch}>
            <input
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              required
              type="text"
              value={query}
              placeholder="Type Here"
              className="w-[50%] py-2 px-5 rounded-3xl focus:outline-none drop-shadow-sm"
            />
            <div className="flex gap-2">
              <input
                required
                checked={filter == "phone"}
                type="radio"
                name="filter"
                id="phone"
                value="phone"
                onChange={(e) => setFilter(e.target.value)}
              />
              <label htmlFor="phone">Phone Number</label>
            </div>
            <div className="flex gap-2">
              <input
                required
                checked={filter == "bib"}
                type="radio"
                name="filter"
                id="bib"
                value="bib"
                onChange={(e) => setFilter(e.target.value)}
              />
              <label htmlFor="bib">Booking ID</label>
            </div>
            <div className="flex gap-2">
              <input
                required
                checked={filter == "email"}
                type="radio"
                name="filter"
                id="email"
                value="email"
                onChange={(e) => setFilter(e.target.value)}
              />
              <label htmlFor="email">Email address</label>
            </div>

            <button className="mx-auto bg-blue-500 py-2 px-4 rounded-xl text-white hover:bg-blue-700">
              Search
            </button>
          </form>
        </div>
        <Participant participant={participant} />
      </div>
    </div>
  );
}

export default Panel;
