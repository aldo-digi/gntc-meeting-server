const express = require('express')
const router = express.Router();

const {addMeeting,getMeetings,getMeeting,deleteMeeting,updateMeeting} = require("../Controllers/meeting");

router.post('/add', addMeeting);
router.get('/get', getMeetings);
router.get('/get/:id', getMeeting);
router.delete('/delete/:id', deleteMeeting);
router.put('/update/:id', updateMeeting);


module.exports = router;