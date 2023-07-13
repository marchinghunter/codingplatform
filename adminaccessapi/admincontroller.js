const axios = require("axios");
const questionModel = require("./dbSchema");
const testcaseModel = require("../testcaseapi/dbSchema");

//Create a new Question using Sphere API call with the given details and also saves question in db
addquestion = async (req, res) => {
  try {
    const data = req.body;

    const spheredata = await axios.post(
      `${process.env.SPHEREENGINE_URI}/problems?access_token=${process.env.SPHEREENGINE_API_KEY}`,
      {
        name: data.questionname,
        body: data.questiondescription,
        masterjudgeId: 1001,
      }
    );
    console.log(spheredata.data.id);
    const dbquestion = await questionModel.create({
      questionname: data.questionname,
      questiondescription: data.questiondescription,
      id: spheredata.data.id,
    });
    res
      .status(200)
      .send(
        `New Question Created Name:${dbquestion.questionname} and Id:${dbquestion.id}`
      );
  } catch (error) {
    res.status(500).send(error);
  }
};
editquestion = async (req, res) => {
  try {
    const questionupdate = req.body;
    //If admin wants to update Question name only
    if (questionupdate.nameflag === true) {
      const spheredata = await axios.put(
        `${process.env.SPHEREENGINE_URI}/problems/${questionupdate.id}?access_token=${process.env.SPHEREENGINE_API_KEY}`,
        {
          name: questionupdate.name,
        }
      );
      const dbquestionstatus = await questionModel.updateOne(
        { id: questionupdate.id },
        { questionname: questionupdate.name }
      );
      res.status(201).send("Question Updated");
    } //If admin wants to update Question name and Question Description both
    else if (
      questionupdate.nameflag === true &&
      questionupdate.descriptionflag === true
    ) {
      const spheredata = await axios.put(
        `${process.env.SPHEREENGINE_URI}/problems/${questionupdate.id}?access_token=${process.env.SPHEREENGINE_API_KEY}`,
        {
          name: questionupdate.name,
          body: questionupdate.description,
        }
      );
      const dbquestionstatus = await questionModel.updateOne(
        { id: questionupdate.id },
        {
          questionname: questionupdate.name,
          questiondescription: questionupdate.description,
        }
      );
      res.status(201).send("Question Updated");
    } //If admin wants to update Question Description only
    else if (questionupdate.descriptionflag === true) {
      const spheredata = await axios.put(
        `${process.env.SPHEREENGINE_URI}/problems/${questionupdate.id}?access_token=${process.env.SPHEREENGINE_API_KEY}`,
        {
          body: questionupdate.description,
        }
      );
      const dbquestionstatus = await questionModel.updateOne(
        { id: questionupdate.id },
        {
          questiondescription: questionupdate.description,
        }
      );
      res.status(201).send("Question Updated");
    } else {
      res.status(404).send("Question Not Found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
deletequestion = async (req, res) => {
  try {
    const questionid = req.body;
    const spheredata = await axios.delete(
      `${process.env.SPHEREENGINE_URI}/problems/${questionid.id}?access_token=${process.env.SPHEREENGINE_API_KEY}`
    );
    const dbquestionstatus = await questionModel.deleteOne({
      id: questionid.id,
    });
    const dbtestcasestatus = await testcaseModel.deleteMany({
      id: questionid.id,
    });
    res.status(201).send("Question Deleted");
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { addquestion, editquestion, deletequestion };
