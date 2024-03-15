const meeting = require('../models/Meeting');

const addMeeting = (req,res) => {
    const {client,start,end,color,event_id} = req.body;
    const newMeeting = new  meeting({client,start,end,color,event_id});
    newMeeting.save().then(()=>res.json('Meeting added')).catch((error)=>res.status(400).json('Error: '+error));
}

const getMeetings = (req,res) => {
    meeting.find().then((meetings)=>res.json(meetings)).catch((error)=>res.status(400).json('Error: '+error));
}

const getMeeting = (req,res) => {
    meeting.findById(req.params.id).then((meeting)=>res.json(meeting)).catch((error)=>res.status(400).json('Error: '+error));
}

const deleteMeeting = (req,res) => {
    meeting.deleteOne({event_id:req.params.id}).then(()=>res.json('Meeting deleted')).catch((error)=>res.status(400).json('Error: '+error));
}

const updateMeeting = (req,res) => {
    meeting.findById(req.params.id).then((meeting)=>{
        meeting.client = req.body.client;
        meeting.start = req.body.start;
        meeting.end = req.body.end;
        meeting.color = req.body.color;
        meeting.event_id = req.body.event_id;
        meeting.save().then(()=>res.json('Meeting updated')).catch((error)=>res.status(400).json('Error: '+error));
    }
    ).catch((error)=>res.status(400).json('Error: '+error));
}

module.exports = {addMeeting, getMeetings, getMeeting, deleteMeeting, updateMeeting};