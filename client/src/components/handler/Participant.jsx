import React, { useContext, useEffect, useState } from "react";
import { BASE_URL } from "../../config";
import { authContext } from "../../context/AuthContext";

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

function Participant({ participant }) {
  const { user } = useContext(authContext);
  const [recieved, setRecieved] = useState(false);
  const [formData, setFormData] = useState({
    bookingId: participant["Booking ID"],
    bibId: "",
    rname: "",
    rphone: "",
    rrelation: "",
    handler: user._id,
    eventId: user.event,
  });
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleRecieverCheck = async () => {
    try {
      const res = await fetch(`${BASE_URL}/user/findReciever`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookingId: participant["Booking ID"],
        }),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message);
      }
      setRecieved(false);
    } catch (err) {
      console.log(err);
      setRecieved(true);
    }
  };

  const handleSelfClick = () => {
    setFormData({
      bookingId: participant["Booking ID"],
      bibId: "",
      rname: participant["Name"],
      rphone: participant["Phone"],
      rrelation: "Self",
      handler: user._id,
      eventId: user.event,
    });
  };

  const handleRecieverSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const res = await fetch(`${BASE_URL}/user/updateReciever`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message);
      }
      setRecieved(true);
      setFormData({
        bookingId: participant["Booking ID"],
        bibId: "",
        rname: "",
        rphone: "",
        rrelation: "",
        handler: user._id,
        eventId: user.event,
      });
    } catch (err) {
      // console.log(err);
    }
  };
  useEffect(() => {
    if (!isEmpty(participant)) {
      setFormData({
        ...formData,
        ["bookingId"]: participant["Booking ID"],
      });
      handleRecieverCheck();
    }
  }, [participant]);
  if (recieved) return <div>Recieved</div>;
  return (
    <div className="relative">
      {isEmpty(participant) ? (
        <div className="">Not Found</div>
      ) : (
        <div className="">
          <div className="bg-gray-100 rounded h-fit w-full gap-5 px-10 py-3  flex items-center justify-between">
            <div className="flex gap-10">
              <p>{participant["Booking ID"]}</p>
              <p>{participant["Name"]}</p>
              <p>{participant["Email"]}</p>
              <p>{participant["Phone"]}</p>
              <p>{participant["Category"]}</p>
              <p>{participant["Gender"]}</p>
              <p>{participant["T-shirt Size"]}</p>
              <p>{participant["Organization"]}</p>
            </div>
            <button
              onClick={handleSelfClick}
              className="bg-blue-500 px-4 py-2 rounded-xl text-white hover:bg-blue-700"
            >
              Self
            </button>
          </div>
          <div className=" w-full bg-gray-200 mx-auto p-5">
            <form
              className="p-5 flex flex-col gap-5"
              onSubmit={handleRecieverSubmit}
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="bibId">BiB ID:</label>
                <input
                  required
                  type="text"
                  id="bibId"
                  name="bibId"
                  value={formData.bibId}
                  onChange={handleInputChange}
                  className="bg-transparent border-b-[2px] border-black focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="name">Reciever Name:</label>
                <input
                  required
                  type="text"
                  id="name"
                  name="rname"
                  value={formData.rname}
                  onChange={handleInputChange}
                  className="bg-transparent border-b-[2px] border-black focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="phoneN">Reciever Phone Number:</label>
                <input
                  required
                  type="text"
                  id="phoneN"
                  name="rphone"
                  value={formData.rphone}
                  onChange={handleInputChange}
                  className="bg-transparent border-b-[2px] border-black focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="relation">Reciever Relation:</label>
                <input
                  required
                  type="text"
                  id="relation"
                  name="rrelation"
                  value={formData.rrelation}
                  onChange={handleInputChange}
                  className="bg-transparent border-b-[2px] border-black focus:outline-none"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 w-[100px]  px-4 py-2 rounded-xl text-white hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Participant;
