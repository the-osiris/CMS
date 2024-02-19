import Admin from "../models/AdminSchema.js";
import Handler from "../models/HandlerSchema.js";
import Event from "../models/EventSchema.js";
import Participant from "../models/ParticipantSchema.js";

export const isAdmin = async (req, res) => {
  //   console.log(req.body);
  let admin = null;
  admin = await Admin.find({ _id: req.body.userId });
  // console.log(admin);
  if (admin.length > 0) {
    res.status(200).send({ success: true, message: "Admin Exist" });
  } else
    res.status(400).send({ success: false, message: "Admin do not exist" });
};
export const isHandler = async (req, res) => {
  // console.log(req.body);
  let handler = null;
  handler = await Handler.find({ _id: req.body.userId });
  // console.log(handler);
  if (handler.length > 0) {
    res.status(200).send({ success: true, message: "Handler Exist" });
  } else
    res.status(400).send({ success: false, message: "Handler do not exist" });
};

function filterById(arr, idToFilter) {
  return arr.filter((obj) => obj["Booking ID"] == idToFilter);
}
function filterByPhone(arr, idToFilter) {
  return arr.filter((obj) => obj["Phone"] == idToFilter);
}
function filterByEmail(arr, idToFilter) {
  return arr.filter((obj) => obj["Email"] == idToFilter);
}

export const findParticipant = async (req, res) => {
  const { event, query, filter } = req.body;
  // console.log(event, query, filter);
  try {
    const temp = await Event.findById(event);
    let data;
    if (filter == "phone") {
      data = filterByPhone(temp.participants, "+91" + query);
    } else if (filter == "email") {
      data = filterByEmail(temp.participants, query);
    } else {
      data = filterById(temp.participants, query);
    }
    if (data.length == 0)
      res
        .status(400)
        .send({ success: false, message: "Couldn't Find participant" });
    else
      res
        .status(200)
        .send({ success: true, message: "Found participant", data: data[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};
export const updataReciever = async (req, res) => {
  const { bookingId, bibId, rname, rphone, rrelation, handler, eventId } =
    req.body;
  // console.log(req.body);
  try {
    let temp = null;
    temp = await Participant.find({ bookingId: bookingId });
    // console.log(temp);
    if (temp.length > 0)
      res.status(400).json({
        success: false,
        message: "User has already recieved their BIB",
      });
    else {
      await new Participant({
        bookingId: bookingId,
        handler: handler,
        eventId: eventId,
        Rname: rname,
        Rphone: rphone,
        Rrelation: rrelation,
        BibID: bibId,
      }).save();

      res.status(200).json({ success: true, message: "Success" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};
export const findReciever = async (req, res) => {
  const { bookingId } = req.body;
  try {
    let temp = null;
    temp = await Participant.find({ bookingId: bookingId });
    if (temp.length > 0)
      res.status(400).json({
        success: false,
        message: "User has already recieved their BIB",
      });
    else {
      res.status(200).json({ success: true, message: "Success" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};
export const getCurrentData = async (req, res) => {
  const { event, _id } = req.body;
  try {
    const temp = await Event.findById(event);
    const participants = await Participant.find({ eventId: event });
    const handlerP = await Participant.find({ handler: _id });
    res.status(200).json({
      success: true,
      message: "Data Retrieved",
      data: {
        total: temp.participants.length,
        all: participants.length,
        own: handlerP,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

function findObjectById(array, id) {
  // console.log(temp, "temp");
  return array.find((obj) => obj._id.toString() == id.toString());
}

function countParticipantsByHandler(handlers, participants) {
  const handlerCounts = {};
  handlers.forEach((handler) => {
    handlerCounts[handler.username] = 0;
  });

  participants.forEach((participant) => {
    const handlerId = participant.handler;
    const username = findObjectById(handlers, handlerId);
    // console.log(username.username);
    handlerCounts[username.username]++;
  });

  return handlerCounts;
}

export const getDataForAdmin = async (req, res) => {
  const { event } = req.body;
  try {
    const temp = await Event.findById(event);
    const participants = await Participant.find({ eventId: event });
    const handlers = await Handler.find({ event: event });
    const tempdata = countParticipantsByHandler(handlers, participants);
    res.status(200).json({
      success: true,
      message: "Data retrieved",
      data: {
        total: temp.participants,
        handlers: tempdata,
        totalR: participants,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};
