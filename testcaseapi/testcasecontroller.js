const testcaseModel = require("./dbSchema");
const axios = require("axios");

//Testcase API
addtestcase = async (req, res) => {
  try {
    const { input, output, id } = req.body;
    const spheredata = await axios.post(
      `${process.env.SPHEREENGINE_URI}/problems/${id}/testcases?access_token=${process.env.SPHEREENGINE_API_KEY}`,
      {
        input: input,
        timeLimit: 5,
        output: output,
        judgeId: 1,
      }
    );
    const dbtestcase = await testcaseModel.create({
      id,
      input,
      output,
    });
    res.status(200).send("New Test Case is Created ");
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports = { addtestcase };
