const jwt = require("jsonwebtoken");

const createToken = (data) => {
  return new Promise((res, rej) => {
    jwt.sign(
      data,
      "nobody should know what's written here",
      { expiresIn: "7d" },
      (err, token) => {
        if (err) rej(err);
        else res(token);
      }
    );
  });
};

const verifyToken = (token) => {
  return new Promise((res, rej) => {
    jwt.verify(
      token,
      "nobody should know what's written here",
      (err, decoded) => {
        if (err) rej(err);
        else res(decoded);
      }
    );
  });
};

module.exports = {
  createToken,
  verifyToken,
};
