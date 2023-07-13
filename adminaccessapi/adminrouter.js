const Router = require("express");
const router = Router();
const { adminAuth } = require('../Authmiddleware');
const {
  addquestion,
  editquestion,
  deletequestion
} = require("./admincontroller");

router.post('/addquestion', adminAuth, addquestion);
router.put('/editquestion', adminAuth, editquestion);
router.delete('/deletequestion', adminAuth, deletequestion);

module.exports = router;
