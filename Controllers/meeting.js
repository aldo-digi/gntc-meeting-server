const meeting = require('../models/Meeting');

export const addMeeting = (req,res) => {
    const {client,start,end} = req.body;
    const newMeeting = new  meeting({client,start,end});
    newMeeting.save().then(()=>res.json('Meeting added')).catch((error)=>res.status(400).json('Error: '+error));
}

export const getMeetings = (req,res) => {
    meeting.find().then((meetings)=>res.json(meetings)).catch((error)=>res.status(400).json('Error: '+error));
}

export const getMeeting = (req,res) => {
    meeting.findById(req.params.id).then((meeting)=>res.json(meeting)).catch((error)=>res.status(400).json('Error: '+error));
}

export const deleteMeeting = (req,res) => {
    meeting.findByIdAndDelete(req.params.id).then(()=>res.json('Meeting deleted')).catch((error)=>res.status(400).json('Error: '+error));
}

export const updateMeeting = (req,res) => {
    meeting.findById(req.params.id).then((meeting)=>{
        meeting.client = req.body.client;
        meeting.start = req.body.start;
        meeting.end = req.body.end;
        meeting.save().then(()=>res.json('Meeting updated')).catch((error)=>res.status(400).json('Error: '+error));
    }
    ).catch((error)=>res.status(400).json('Error: '+error));
}
