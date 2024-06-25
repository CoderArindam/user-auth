import UserModel from "../models/User.js";
import bcrypt from "bcrypt";
const UserControllers = async (req, res) => {
  try {
    //extract request body parameters
    const { name, email, password, password_confirmation } = req.body;

    //check if all required fields are provided or not

    if (!name || !email || !password || !password_confirmation) {
      return res
        .status(400)
        .json({ status: "failed", message: "all fields are needed" });
    }

    //check password match
    if (password !== password_confirmation) {
      return res
        .status(400)
        .json({ status: "failed", message: "passwords do not match!" });
    }

    //check if user already exists or not
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ status: "failed", message: "user already exists" });
    }

    //generate salt and hashed password
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(password, salt);

    //create a new user

    const newUser = await new UserModel({
      name,
      email,
      password: hashedPassword,
    }).save();

    res.status(201).json({
      status: "success",
      message: "registration successful",
      user: { id: newUser._id, email: newUser.email },
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ status: "failed", message: "unable to register" });
  }
};

export default UserControllers;
