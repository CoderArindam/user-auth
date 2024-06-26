// This middleware will set the Authorization header and also refresh the access token upon expiry automatically
//if we use this middleware then we won't have to explicitly make a request to /refresh-token api url

import isTokenExpired from "../utils/isTokenExpired.js";
import refreshAccessToken from "../utils/refreshAccessToken.js";
import setTokensCookies from "../utils/setTokensCookies.js";

const accessTokenAutoRefresh = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;

    if (accessToken || !isTokenExpired(accessToken)) {
      req.headers["authorization"] = `Bearer ${accessToken}`;
    }
    if (!accessToken || isTokenExpired(accessToken)) {
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        throw new Error("refresh token is missing or expired!");
      }
      //if access token is expired, make a fresh token request
      const {
        newAccessToken,
        newRefreshToken,
        newAccessTokenExp,
        newRefreshTokenExp,
      } = await refreshAccessToken(req, res);

      //set new token to cookie
      setTokensCookies(
        res,
        newAccessToken,
        newRefreshToken,
        newAccessTokenExp,
        newRefreshTokenExp
      );
      //  Add the access token to the Authorization header
      req.headers["authorization"] = `Bearer ${newAccessToken}`;
    }
    next();
  } catch (e) {
    console.error("error adding access token to header", e.message);
    // Handle the error, such as returning an error response or redirecting to the login page
    res.status(401).json({
      error: "Unauthorized",
      message: "Access token is missing or invalid",
    });
  }
};

export default accessTokenAutoRefresh;
