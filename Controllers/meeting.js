const meeting = require('../Models/Meeting');
const {createTransport} = require("nodemailer");

var transporter = createTransport({
    service: 'gmail',
    auth: {
        user: 'abdulmannankhan1000@gmail.com',
        pass: 'tejd rrxm ezzl ctwf'
    }
});

const addMeeting = (req,res) => {
    const {clients,start,end,color,event_id} = req.body;
    const newMeeting = new  meeting({clients,start,end,color,event_id});
    newMeeting.save().then(()=> {
        clients.forEach(client => {
                transporter.sendMail({
                    from: 'abdulmannankhan1000@gmail.com',
                    to: clients[0],
                    subject: 'Ftesë për Takim (Meeting Titel*)',
                    html: `<h1>Dear ${client},</h1><p>You have been invited to a meeting on ${new Date(start).toLocaleDateString()} and time ${new Date(start).toLocaleTimeString()} to  ${new Date(end).toLocaleDateString()} and time ${new Date(end).toLocaleTimeString()}.</p>`
                })  .then(function (info) {
                    console.log(info);
                }).catch(function (error) {
                    console.log(error);
                })
        }

        );
        res.json('Meeting added')
    }).catch((error)=>res.status(400).json('Error: '+error));
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
        meeting.clients = req.body.clients;
        meeting.start = req.body.start;
        meeting.end = req.body.end;
        meeting.color = req.body.color;
        meeting.event_id = req.body.event_id;
        meeting.save().then(()=>res.json('Meeting updated')).catch((error)=>res.status(400).json('Error: '+error));
    }
    ).catch((error)=>res.status(400).json('Error: '+error));
}

module.exports = {addMeeting, getMeetings, getMeeting, deleteMeeting, updateMeeting};
