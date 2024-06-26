const setTokensCookies = (
  res,
  accessToken,
  refreshToken,
  accessTokenExp,
  refreshTokenExp
) => {
  const accessTokenMaxAge =
    (accessTokenExp - Math.floor(Date.now() / 1000)) * 1000;
  console.log("newAccessTokenExp:", accessTokenExp);

  const refreshTokenMaxAge =
    (refreshTokenExp - Math.floor(Date.now() / 1000)) * 1000;
  console.log("max age:", refreshTokenExp);

  //set cookie for access token

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: false, //set secure true if using https
    maxAge: accessTokenMaxAge,
    sameSite: "strict", //we can adjust according to our requirement
  });
  //set cookie for refresh token
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false, //set secure true if using https
    maxAge: refreshTokenMaxAge,
    sameSite: "strict", //we can adjust according to our requirement
  });
};

export default setTokensCookies;
