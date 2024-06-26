import UserModel from "../models/User.js";
import UserRefreshTokenModel from "../models/UserRefreshToken.js";
import generateTokens from "./generateTokens.js";
import verifyRefreshToken from "./verifyRefreshToken.js";

const refreshAccessToken = async (req, res) => {
  //   console.log("request", req.cookies);
  try {
    const oldRefreshToken = req.cookies.refreshToken;
    console.log("oldRefreshToken", oldRefreshToken);
    //verify refresh token
    const { tokenDetails, error } = await verifyRefreshToken(oldRefreshToken);
    console.log("token detals:", tokenDetails);

    //find the user based on refresh token detail id
    const user = await UserModel.findById(tokenDetails._id);

    if (!user) {
      return res
        .status(404)
        .json({ status: "failed", message: "user not found" });
    }
    console.log("user", user);
    //extract the user refresh token using the id from database

    const userRefreshToken = await UserRefreshTokenModel.findOne({
      userId: tokenDetails._id,
    });
    console.log("user refresh token:", userRefreshToken.token);
    console.log("old refresh token:", oldRefreshToken);
    if (oldRefreshToken !== userRefreshToken.token) {
      return res
        .status(401)
        .json({ status: "failed", message: "unauthorized access" });
    }

    const { accessToken, refreshToken, accessTokenExp, refreshTokenExp } =
      generateTokens(user);
    return {
      newAccessToken: accessToken,
      newRefreshToken: refreshToken,
      newAccessTokenExp: accessTokenExp,
      newRefreshTokenExp: refreshTokenExp,
    };
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .send({ status: "failed", message: "internal server error!" });
  }
};

export default refreshAccessToken;
