const userModel = require("./dbSchema");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const maxAge = 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_PASS, { expiresIn: "24h" });
};

//User Signup API
const signup = async (req, res) => {
  try {
    const data = req.body;
    const user = await userModel.create(data); //creating new user
    const accesstoken = await createToken(user.email); //creating JWT token
    const responsetouser = {
      email: user.email,
      accesstoken,
    };
    res
      .status(200)
      .cookie("JWT", accesstoken, {
        maxAge: maxAge * 1000,
        sameSite: "strict",
      }) //sending JWT token as a cookie
      .send(responsetouser);
  } catch (error) {
    res.status(500).send(error);
  }
};

//User Signin API
const signin = async (req, res) => {
  try {
    const user = req.body;
    const data = await userModel.findOne({ email: user.email }); //getting user data from database

    if (data === null) {
      return res.status(404).send("User not Found");
    }
    const ispasswordcorrect = await bcrypt.compare(
      user.password,
      data.password
    ); //checking password
    if (ispasswordcorrect === true) {
      const accesstoken = createToken(user.email);
      const responsetouser = {
        email: user.email,
        accesstoken,
      };
      res
        .status(201)
        .cookie("JWT", accesstoken, {
          maxAge: maxAge * 1000,
          sameSite: "strict",
        }) //sending JWT token as a cookie
        .send(responsetouser);
    } else {
      res.send("invalid password");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
//Submission API
const submission = async (req, res) => {
  try {
    const { problemId, source } = req.body;
    const jwttoken = req.cookies.JWT; //Getting saved cookie
    const user = jwt.verify(jwttoken, process.env.JWT_PASS);
    const spheredata = await axios.post(
      `https://093e5c5b.problems.sphere-engine.com/api/v4/submissions?access_token=${process.env.SPHEREENGINE_API_KEY}`,
      {
        problemId: problemId,
        compilerId: 10,
        source: source,
      }
    );
    await new Promise((resolve) => setTimeout(resolve, 5000)); // Delay for 5 seconds

    //After submission of users answer it will wait for 5 second and fetch result of the users submission
    const spheresubmissiondata = await axios.get(
      `https://093e5c5b.problems.sphere-engine.com/api/v4/submissions/${spheredata.data.id}?access_token=${process.env.SPHEREENGINE_API_KEY}`
    );
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "vergie.swift@ethereal.email",//enter your ethereal email address
        pass: "r2uxQHfn9ERpSf8QPc",//enter your ethereal email password
      },
    });

    // Configure the email message
    const mailOptions = {
      from: "vergie.swift@ethereal.email",
      to: user.id,
      subject: "Submission Result",
      text: `Your Submission result: ${spheresubmissiondata.data.result.status.name} \nYour submission id: ${spheredata.data.id}`,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    res
      .status(200)
      .send(
        `Your Submission result: ${spheresubmissiondata.data.result.status.name} \nYour submission id: ${spheredata.data.id}\n Email also sent successfully`
      );
  } catch (error) {
    res.status(500).send(error);
  }
};

//Check Submission API
const checksubmission = async (req, res) => {
  try {
    const { submissionid } = req.body;

    const spheresubmissiondata = await axios.get(
      `${process.env.SPHEREENGINE_URI}/submissions/${submissionid}?access_token=${process.env.SPHEREENGINE_API_KEY}`
    );
    res
      .status(200)
      .send(
        `Your Submission result: ${spheresubmissiondata.data.result.status.name}`
      );
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { signup, signin, submission, checksubmission };
