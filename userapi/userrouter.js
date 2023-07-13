const {Router} = require('express')
const {signup,signin,submission,checksubmission} = require('./usercontroller')
router= Router();

router.post('/signup',signup)
router.post('/signin',signin)
router.post('/submission',submission)
router.post('/checksubmission',checksubmission)

module.exports = router;