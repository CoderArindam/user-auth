import UserModel from "../models/User.js";
import bcrypt from "bcrypt";
import generateTokens from "../utils/generateTokens.js";
import setTokensCookies from "../utils/setTokensCookies.js";
import refreshAccessToken from "../utils/refreshAccessToken.js";

// User Registration Controller
const userRegistration = async (req, res) => {
  try {
    // Extract request body parameters
    const { name, email, password, password_confirmation } = req.body;

    // Check if all required fields are provided
    if (!name || !email || !password || !password_confirmation) {
      return res
        .status(400)
        .json({ status: "failed", message: "All fields are needed" });
    }

    // Check if passwords match
    if (password !== password_confirmation) {
      return res
        .status(400)
        .json({ status: "failed", message: "Passwords do not match!" });
    }

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ status: "failed", message: "User already exists" });
    }

    // Generate salt and hash the password
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = await new UserModel({
      name,
      email,
      password: hashedPassword,
    }).save();

    res.status(201).json({
      status: "success",
      message: "Registration successful",
      user: { id: newUser._id, email: newUser.email },
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ status: "failed", message: "Unable to register" });
  }
};

// User Login Controller
const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if email and password are provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ status: "failed", message: "All fields are required!" });
    }

    // Check if user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: "failed",
        message: "Wrong email or password entered!",
      });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        status: "failed",
        message: "Wrong email or password entered!",
      });
    }

    //generate jwt token

    const { accessToken, refreshToken, accessTokenExp, refreshTokenExp } =
      await generateTokens(user);
    console.log("access tokenen exp ", accessTokenExp);

    //set in cookies

    setTokensCookies(
      res,
      accessToken,
      refreshToken,
      accessTokenExp,
      refreshTokenExp
    );

    //send success response with jwt token

    res.status(200).json({
      status: "success",
      message: "login successfull",
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
      access_token: accessToken,
      refresh_token: refreshToken,
      access_token_exp: accessTokenExp,
      refresh_token_exp: refreshTokenExp,
      is_auth: true,
    });
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ status: "failed", message: "Unable to login!" });
  }
};

//get a new access token

const getNewAccessToken = async (req, res) => {
  try {
    //get a new access token using refresh token
    const {
      newAccessToken,
      newRefreshToken,
      newAccessTokenExp,
      newRefreshTokenExp,
    } = await refreshAccessToken(req, res);
    console.log("new access token:", newAccessToken);
    //set new access token to cookie
    setTokensCookies(
      res,
      newAccessToken,
      newRefreshToken,
      newAccessTokenExp,
      newRefreshTokenExp
    );
    res.status(200).json({
      status: "success",
      message: "new token granted",

      access_token: newAccessToken,
      refresh_token: newRefreshToken,
      access_token_exp: newAccessTokenExp,
      refresh_token_exp: newRefreshTokenExp,
      is_auth: true,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      status: "failed",
      message: "unable to generate new access token!",
    });
  }
};

// Export the controllers
export { userRegistration, userLogin, getNewAccessToken };
