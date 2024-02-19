import mongoose from "mongoose";

const handlerSchema = new mongoose.Schema({
  event: {
    type: mongoose.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Handler", handlerSchema);
