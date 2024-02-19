import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  admin: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  organizer: {
    type: String,
    required: true,
  },
  participants: {
    type: Array,
    required: true,
  },
  handlers: {
    type: Array,
    required: true,
  },
});

export default mongoose.model("Event", EventSchema);
