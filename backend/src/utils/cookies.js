// Get token from cookies
// Receive a cookieName and returns the token corresponding to that cookie
const getTokenFromCookie = async (req, cookieName) => {
  // Getting cookie from the req since it would be sent along with the request if present
  const token = req.cookies[cookieName];
  if (!token) throw new Error("No token, authorization denied");
  return token;
};

// Clearing cookie from the browser
// Does not matter whether there exist a cookie with that name or not it simply clears cookies with the name
const clearCookie = (res, cookieName) => {
  res.clearCookie(cookieName);
};

// Store cookies in the browser for usage in future request
const setCookie = (res, cookieName, cookie) => {
  res.cookie(cookieName, cookie, {
    httpOnly: true,
  });
};

// Exports all modules under cookies
module.exports = {
  clearCookie,
  getTokenFromCookie,
  setCookie,
};
