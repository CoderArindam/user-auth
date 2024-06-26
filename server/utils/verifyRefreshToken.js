import jwt from "jsonwebtoken";
import UserRefreshTokenModel from "../models/UserRefreshToken.js";

const verifyRefreshToken = async (oldRefreshToken) => {
  try {
    const privateKey = process.env.JWT_REFRESH_TOKEN_SECRET_KEY;
    // console.log("oldRefreshToken", oldRefreshToken);

    //find the refresh token in database
    const userRefreshToken = await UserRefreshTokenModel.findOne({
      token: oldRefreshToken,
    });
    console.log("userRefreshToken:", userRefreshToken);
    if (!userRefreshToken) {
      throw { error: true, message: "invalid refresh token" };
    }

    //verify the refresh token

    const tokenDetails = jwt.verify(oldRefreshToken, privateKey);
    console.log("JWT Verified", tokenDetails);

    //upon successfull verification, return token details
    return {
      tokenDetails,
      error: false,
      message: "valid refresh token",
    };
  } catch (e) {
    throw { error: true, message: "invalid refresh token" };
  }
};

export default verifyRefreshToken;
