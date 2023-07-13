require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
const userrouter = require("./userapi/userrouter");
const adminrouter = require("./adminaccessapi/adminrouter");
const testcaserouter = require("./testcaseapi/testcaserouter");

app.use(bodyParser.json());
app.use(cookieParser());
app.use(userrouter);
app.use(testcaserouter);
app.use(adminrouter);

app.listen(process.env.PORT, () => {
  console.log("Server is running on port 5000");
});
