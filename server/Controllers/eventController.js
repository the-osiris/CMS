import Handler from "../models/HandlerSchema.js";
import Event from "../models/EventSchema.js";
import Participant from "../models/ParticipantSchema.js";

export const create = async (req, res) => {
  const { admin, name, organizer, handler, particpants } = req.body;
  try {
    let event = null;
    event = await Event.findOne({ name });
    if (event) {
      return res.status(400).json({ message: "Event Name already in use" });
    }
    event = new Event({
      admin: admin,
      name,
      organizer,
      participants: particpants,
      handlers: handler,
    });
    // console.log(handler);
    let temp = await event.save();

    handler.map(async (user) => {
      await new Handler({
        event: temp._id,
        username: user.username,
        password: user.password,
      }).save();
    });
    return res.status(200).json({ success: true, message: "Success" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const getEvents = async (req, res) => {
  const { userId } = req.body;
  try {
    const events = await Event.find({ admin: userId });
    // console.log(events);
    return res.status(200).json({
      success: true,
      message: "Listing Events",
      data: events,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const getUniqueName = async (req, res) => {
  const { name, organizer } = req.body;
  // console.log(name);
  if (name == "" || organizer == "")
    res.status(400).json({ success: false, message: "Fill all the fields" });
  else {
    try {
      let temp = null;
      temp = await Event.find({ name: name });
      // console.log(temp);
      if (temp.length > 0) {
        return res
          .status(400)
          .json({ success: false, message: "Event Name Already Exists!" });
      } else
        return res
          .status(200)
          .json({ success: true, message: "Details Verified" });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }
};
export const getUniqueHandler = async (req, res) => {
  const { username } = req.body;
  try {
    let temp = null;
    temp = await Handler.find({ username: username });
    // console.log(temp);
    if (temp.length > 0) {
      res.status(400).json({
        success: false,
        message: "Handler Already Exists! Try Something Else",
      });
    } else res.status(200).json({ success: true, message: "Details Verified" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
export const deleteEvent = async (req, res) => {
  const { event } = req.body;
  try {
    await Event.findByIdAndDelete(event);
    await Handler.deleteMany({ event: event });
    await Participant.deleteMany({ eventId: event });
    res.status(200).json({ success: true, message: "Deleted!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
