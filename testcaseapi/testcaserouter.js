const Router = require("express");
const router = Router();
const { adminAuth } = require('../Authmiddleware');
const {addtestcase} = require('./testcasecontroller')

router.post('/addtestcase', adminAuth, addtestcase);

module.exports = router;