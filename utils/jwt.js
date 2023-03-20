const jwt = require("jsonwebtoken");
const createJWT = ({ id, email, firstname,role }) => {
  return jwt.sign({ id, email, firstname, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXP,
  });
};




module.exports = createJWT;