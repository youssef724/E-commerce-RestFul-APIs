const jwt = require("jsonwebtoken");
const createToken = (id) => {
  return jwt.sign({ id }, process.env.Jwt_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

module.exports = createToken;   