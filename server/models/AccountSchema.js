import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verified: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("Account", AccountSchema);
