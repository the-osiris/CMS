import mongoose from "mongoose";

const participantSchema = new mongoose.Schema({
  handler: {
    type: mongoose.Types.ObjectId,
    ref: "Handler",
    required: true,
  },
  eventId: {
    type: mongoose.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  Rname: {
    type: String,
    required: true,
  },
  Rphone: {
    type: String,
    required: true,
  },
  Rrelation: {
    type: String,
    required: true,
  },
  bookingId: {
    type: String,
    required: true,
  },
  BibID: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Participant", participantSchema);
