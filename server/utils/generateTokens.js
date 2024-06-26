import jwt from "jsonwebtoken";
import UserRefreshTokenModel from "../models/UserRefreshToken.js";

const generateTokens = async (user) => {
  console.log("generate token file user:", user._id);
  try {
    const payload = { _id: user._id };

    //generate access token with expiration time
    const accessTokenExp = Math.floor(Date.now() / 1000) + 500; //token will expire in 120 seconds

    const accessToken = jwt.sign(
      { ...payload, exp: accessTokenExp },
      process.env.JWT_ACCESS_TOKEN_SECRET_KEY
    );
    console.log("access token:", accessToken);
    //generate refresh token with expiration time

    const refreshTokenExp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 5; //refresh token will expire in 5 days.

    const refreshToken = jwt.sign(
      {
        ...payload,
        exp: refreshTokenExp,
      },
      process.env.JWT_REFRESH_TOKEN_SECRET_KEY
    );
    const userRefreshToken = await UserRefreshTokenModel.findOneAndDelete({
      userId: user._id,
    });

    //save new refresh token in database
    await new UserRefreshTokenModel({
      userId: user._id,
      token: refreshToken,
    }).save();

    return Promise.resolve({
      accessToken,
      refreshToken,
      accessTokenExp,
      refreshTokenExp,
    });
  } catch (e) {
    return Promise.reject(e);
  }
};

export default generateTokens;
