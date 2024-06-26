import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, unique: false },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: { type: String, required: true, trim: true },
  is_verified: { type: Boolean, default: false },
});

//Model

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
