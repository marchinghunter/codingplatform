const jwt = require("jsonwebtoken");
const userModel = require("./userapi/dbSchema");

//This middleware checks if user is Admin or not
const adminAuth = async (req, res, next) => {
  const jwttoken = req.cookies.JWT;//Getting saved cookie
  const user = jwt.verify(jwttoken, process.env.JWT_PASS);
  const data = await userModel.findOne({ email: user.id });
  if (data.role == "admin") {
    next();
  } else {
    return res.status(404).send("You are not admin");
  }
};

module.exports = { adminAuth };
