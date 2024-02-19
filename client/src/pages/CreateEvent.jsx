import React, { useState, useContext } from "react";
import { authContext } from "../context/AuthContext.jsx";
import { IoIosArrowBack, IoMdAddCircle } from "react-icons/io";
import { FaInfoCircle } from "react-icons/fa";
import { CiLock, CiUnlock } from "react-icons/ci";
import { BASE_URL } from "../config.js";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Handler from "../components/handler/Handler";
import Participants from "../components/participants/Participants";
import ShowParticipant from "../components/participants/ShowParticipant.tsx";

function CreateEvent() {
  const navigate = useNavigate();
  const { user } = useContext(authContext);
  const [popup, setPopup] = useState(false);
  const [active, setActive] = useState("info");

  const [popupData, setPopupData] = useState({
    username: "",
    password: "",
  });
  const [eventData, setEventData] = useState({
    admin: user._id,
    name: "",
    organizer: "",
    handler: [],
    particpants: [],
  });

  const handleInputChange = (e) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value,
    });
  };
  const popupHandler = () => {
    setPopup(!popup);
    setPopupData({
      username: "",
      password: "",
    });
  };
  const handleCreateHandler = async (e) => {
    e.preventDefault();
    if (eventData.handler.find((item) => item.username == popupData.username)) {
      toast.error("Enter Unique Username");
    } else if (popupData.username == "" || popupData.password == "") {
      toast.error("Something is wrong with username/password");
    } else {
      const tempHandler = {
        username: popupData.username,
        password: popupData.password,
      };

      try {
        const res = await fetch(`${BASE_URL}/event/getUniqueHandler`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(tempHandler),
        });

        const result = await res.json();

        if (!res.ok) {
          throw new Error(result.message);
        }

        setEventData({
          ...eventData,
          ["handler"]: [...eventData.handler, tempHandler],
        });

        setPopupData({
          username: "",
          password: "",
        });
      } catch (err) {
        toast.error(err.message);
      }
    }
  };
  const handleDelete = (username) => {
    const newHandlers = eventData.handler.filter(
      (user) => user.username !== username
    );
    setEventData({
      ...eventData,
      ["handler"]: newHandlers,
    });
  };

  const handleParticipant = (participants) => {
    setEventData({
      ...eventData,
      ["particpants"]: participants,
    });
  };

  const handleBasicInfoSave = async () => {
    try {
      const res = await fetch(`${BASE_URL}/event/getUniqueName`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: eventData.name,
          organizer: eventData.organizer,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      setActive("handler");
      // toast.success(result.message);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleCreateEventSubmit = async (e) => {
    e.preventDefault();
    // console.log(user._id);
    try {
      const res = await fetch(`${BASE_URL}/event/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }
      toast.success(result.message);
      navigate("/admin");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="h-screen flex">
      <div className="w-[300px] bg-black flex flex-col gap-4 text-white text-md items-start p-4">
        <Link to="/admin" className="flex items-center mb-9 hover:opacity-50">
          <IoIosArrowBack />
          Back
        </Link>
        <button
          name="info"
          disabled
          className={
            active == "info"
              ? "w-[200px] border-[1px] bg-white text-black   border-white px-4 py-1 rounded flex items-center justify-between"
              : "w-[200px] border-[1px]    border-white px-4 py-1 rounded flex items-center justify-between"
          }
        >
          <p name="info">Basic Info</p>
          {active == "info" ? <CiUnlock /> : <CiLock />}
        </button>
        <button
          name="handler"
          disabled
          className={
            active == "handler"
              ? "w-[200px] border-[1px] bg-white text-black   border-white px-4 py-1 rounded flex items-center justify-between"
              : "w-[200px] border-[1px]    border-white px-4 py-1 rounded flex items-center justify-between"
          }
        >
          <p>Add Handlers</p>
          {active == "handler" ? <CiUnlock /> : <CiLock />}
        </button>
        <button
          name="participant"
          disabled
          className={
            active == "participant"
              ? "w-[200px] border-[1px] bg-white text-black   border-white px-4 py-1 rounded flex items-center justify-between"
              : "w-[200px] border-[1px]  border-white px-4 py-1 rounded flex items-center justify-between"
          }
        >
          <p>Add Participants</p>
          {active == "participant" ? <CiUnlock /> : <CiLock />}
        </button>
        <button
          name="terms"
          disabled
          className={
            active == "terms"
              ? "w-[200px] border-[1px] bg-white text-black   border-white px-4 py-1 rounded flex items-center justify-between"
              : "w-[200px] border-[1px]    border-white px-4 py-1 rounded flex items-center justify-between"
          }
        >
          <p>Accept Terms</p>
          {active == "terms" ? <CiUnlock /> : <CiLock />}
        </button>
      </div>
      <div className="relative w-full">
        <form className="p-5" onSubmit={handleCreateEventSubmit}>
          {active == "info" && (
            <div className="p-5 bg-white h-full w-full">
              <h1 className="text-center  text-4xl font-medium text-gray-500">
                Basic Info
              </h1>
              <div className="p-5">
                <div className="flex flex-col">
                  <label htmlFor="name" className="text-xl">
                    Q. Event Name?
                  </label>
                  <input
                    value={eventData.name}
                    onChange={handleInputChange}
                    required
                    className="bg-black py-2 px-4 rounded my-2 text-white focus:outline-none"
                    placeholder="Name of the event?"
                    type="text"
                    name="name"
                    id="name"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="organizer" className="text-xl">
                    Q. Event Organizer?
                  </label>
                  <input
                    value={eventData.organizer}
                    onChange={handleInputChange}
                    required
                    className="bg-black py-2 px-4 rounded my-2 text-white focus:outline-none"
                    placeholder="Name of the event organizer?"
                    type="text"
                    name="organizer"
                    id="organizer"
                  />
                </div>
              </div>
              <div className="p-5 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    handleBasicInfoSave();
                  }}
                  className="bg-blue-500 py-1 px-4 rounded text-white hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </div>
          )}
          {active == "handler" && (
            <div className="p-5 bg-white h-full w-full">
              <h1 className="text-center  text-4xl font-medium text-gray-500">
                Add Handlers
              </h1>
              <div className="relative p-5">
                <div className=" ">
                  <div
                    onClick={popupHandler}
                    className="flex items-center gap-3 w-fit bg-gray-100 hover:bg-gray-200 text-gray-400 hover:text-black rounded-xl px-4 py-2 cursor-pointer"
                  >
                    <IoMdAddCircle className="text-blue-500 text-4xl" />
                    <p className="text-sm ">Add Handler</p>
                  </div>
                </div>
                <div
                  className={
                    popup
                      ? "my-2 w-[300px] p-5 bg-gray-100 rounded-xl"
                      : "hidden"
                  }
                >
                  <div>
                    <div className="px-5 flex flex-col">
                      <label htmlFor="username">Create Username:</label>
                      <input
                        autoComplete="username"
                        value={popupData.username}
                        required
                        type="text"
                        name="username"
                        id="username"
                        className="border-b-[1px] border-black bg-transparent focus:outline-none focus:border-blue-500"
                        onChange={(e) => {
                          setPopupData({
                            ...popupData,
                            ["username"]: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="px-5 py-3 flex flex-col">
                      <label htmlFor="password">Create Password:</label>
                      <input
                        autoComplete="password"
                        value={popupData.password}
                        required
                        type="password"
                        name="password"
                        id="password"
                        className="border-b-[1px] border-black bg-transparent focus:outline-none focus:border-blue-500"
                        onChange={(e) => {
                          setPopupData({
                            ...popupData,
                            ["password"]: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="px-5 py-2 flex justify-between">
                      <button
                        onClick={handleCreateHandler}
                        type="button"
                        className="bg-blue-500 px-4 py-2 text-white rounded-xl hover:bg-blue-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={popupHandler}
                        type="button"
                        className="bg-blue-500 px-4 py-2 text-white rounded-xl hover:bg-blue-700"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-5 gap-y-5">
                  {/* <Handler username="Kunal" /> */}
                  {eventData.handler.map((user, index) => {
                    return (
                      <Handler
                        key={index}
                        username={user.username}
                        password={user.password}
                        handleDelete={handleDelete}
                      />
                    );
                  })}
                </div>
              </div>
              <div className="p-5 flex justify-between">
                <button
                  type="button"
                  onClick={() => {
                    setActive("info");
                  }}
                  className="bg-blue-500 py-1 px-4 rounded text-white hover:bg-blue-700"
                >
                  Go Back
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (eventData.handler.length > 0) setActive("participant");
                    else toast.error("Add atleast 1 handler");
                  }}
                  className="bg-blue-500 py-1 px-4 rounded text-white hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </div>
          )}
          {active == "participant" && (
            <div className="p-5 bg-white h-full w-full">
              <div className="flex flex-col">
                <h1 className="text-center  text-4xl font-medium text-gray-500">
                  Add Participants
                </h1>
                <div className="w-full p-5 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <FaInfoCircle className="text-blue-500" />
                    <p>Upload only .xlsx File</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaInfoCircle className="text-blue-500" />
                    <p>
                      First, Download the Format and fill the data accordingly
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaInfoCircle className="text-blue-500" />
                    <p>
                      Do not leave any cell empty, or it might result into
                      error. You can fill it with "-"
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-5 mt-5 h-fit">
                <Participants handleParticipant={handleParticipant} />
                <ShowParticipant particpants={eventData.particpants} />
              </div>
              <div className=" p-5 flex justify-between">
                <button
                  type="button"
                  onClick={() => {
                    setActive("handler");
                  }}
                  className="bg-blue-500 py-1 px-4 rounded text-white hover:bg-blue-700"
                >
                  Go Back
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (eventData.particpants.length > 0) setActive("terms");
                    else toast.error("Participant Data not saved");
                  }}
                  className="bg-blue-500 py-1 px-4 rounded text-white hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </div>
          )}
          {active == "terms" && (
            <div className="p-5 bg-white h-full w-full flex flex-col items-center">
              <h1 className="text-center  text-4xl font-medium text-gray-500">
                Terms & Conditions
              </h1>
              <div className="w-[1000px] h-[700px] overflow-y-auto text-sm my-4 bg-gray-100 p-5 ">
                <h1 className="text-xl font-semibold my-2 mb-8">
                  Terms and Conditions
                </h1>
                <p>
                  These terms and conditions ("Terms") govern your use of
                  [Software Name], its website, and any related services
                  provided by [Company Name]. By accessing or using our
                  software, you agree to be bound by these Terms. If you do not
                  agree to abide by these Terms, please do not use our software.
                </p>
                <h1 className="text-lg font-semibold my-2">1. License</h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Impedit natus odit consequuntur soluta magni earum similique
                  itaque error, laboriosam voluptate est eveniet provident!
                  Reiciendis blanditiis soluta beatae atque deleniti eligendi
                  distinctio, fuga odit commodi explicabo architecto consequatur
                  expedita perspiciatis vel! Ea sit numquam suscipit aperiam,
                  aliquid sed dignissimos dolores id. Commodi optio placeat, id
                  possimus modi, voluptatem laudantium et amet atque officia
                  dolore beatae rem doloremque rerum natus. Vero dolores nisi,
                  eius quaerat rerum suscipit voluptate soluta dolorum minus
                  nesciunt repellat voluptatem possimus natus aut voluptates
                  iure quia fugit corporis laboriosam aperiam enim, nulla ipsam?
                  Fuga obcaecati facilis voluptates eveniet.
                </p>
                <h1 className="text-lg font-semibold my-2">
                  2. Data Storage and Confidentiality
                </h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste
                  inventore dolorum quis asperiores autem quo consequatur
                  perspiciatis hic, cupiditate, voluptatum, aliquam magnam.
                  Laudantium illum, perferendis odit aperiam laboriosam eius
                  dolore.
                </p>
                <h1 className="text-lg font-semibold my-2">
                  3. User Responsibilities
                </h1>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Tempore doloribus voluptatum a voluptatibus nihil impedit
                  ipsum et? Quis obcaecati nam eligendi ipsam maxime fugiat
                  praesentium esse, voluptate recusandae, debitis a dolores
                  similique perferendis corrupti minima corporis aliquam, labore
                  odio. Rerum asperiores maiores debitis voluptate recusandae
                  dolore officia natus non fuga voluptates possimus, aperiam
                  iste cumque tenetur aliquid eligendi nisi sapiente.
                </p>
                <h1 className="text-lg font-semibold my-2">
                  4. Intellectual Property
                </h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Perspiciatis, eum laborum neque amet sunt facere
                  necessitatibus vitae nobis sed accusamus, ducimus excepturi
                  officia numquam, veritatis repellat sequi. Provident, enim!
                  Quasi.
                </p>
                <h1 className="text-lg font-semibold my-2">5. Termination</h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Soluta officiis laborum corporis eos. Ratione numquam id,
                  laboriosam quidem temporibus veniam consequuntur qui illo
                  deserunt amet recusandae accusamus! Dolore, ut ipsa.
                </p>
                <h1 className="text-lg font-semibold my-2">
                  6. Disclaimer of Warranties
                </h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Debitis voluptas facilis eligendi placeat sequi, tempore quas
                  molestiae delectus atque illo eos autem animi sapiente, fugit,
                  et quidem dolorum distinctio veniam.
                </p>
                <h1 className="text-lg font-semibold my-2">
                  7. Limitation of Liability
                </h1>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Provident commodi enim ea nostrum veniam consequatur quia
                  numquam ipsa nesciunt libero maxime odio, quam, non aliquid
                  tempora illum facere deserunt accusantium?
                </p>
                <div className="flex gap-3 my-10">
                  {/* <input
                    type="checkbox"
                    name="tnCagree"
                    onChange={() => setTnC(!tnC)}
                    id=""
                  /> */}
                  <p>
                    By clicking on "Create My Event", You agree with all the
                    terms and Conditions
                  </p>
                </div>
              </div>
              <div className="p-5 w-full flex justify-between">
                <button
                  type="button"
                  onClick={() => {
                    setActive("participant");
                  }}
                  className="bg-blue-500 py-1 px-4 rounded text-white hover:bg-blue-700"
                >
                  Go Back
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 py-1 px-4 rounded text-white hover:bg-blue-700"
                >
                  Create My Event
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default CreateEvent;
