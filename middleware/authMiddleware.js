const jwt = require("../config/jwt");

module.exports = async (req, res, next) => {
  try {
    req.jwtData = await jwt.verifyToken(req.headers.token);
    next();
  } catch (err) {
    res.json({ status: 400, msg: "you must be logged in to check this" });
  }
};
