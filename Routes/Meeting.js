const express = require('express')
const router = express.Router();

const {sendEmail,addMeeting,getMeetings,getHistoryMeetings,getMeeting,deleteMeeting,updateMeeting,approveMeeting,disApproveMeeting} = require("../Controllers/meeting");

router.post('/add', addMeeting);
router.get('/get', getMeetings);
router.get('/get/:id', getMeeting);
router.delete('/delete/:id', deleteMeeting);
router.put('/update/:id', updateMeeting);
router.put('/approve/:id', approveMeeting);
router.put('/disapprove/:id', disApproveMeeting);
router.put('/sendEmail', sendEmail);
router.get('/getHistory', getHistoryMeetings);

module.exports = router;