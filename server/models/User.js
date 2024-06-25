import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
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

const UserModel = mongoose.model("user", UserSchema);

export default UserModel;
