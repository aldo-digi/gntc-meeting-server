const meetingModel = require('../Models/Meeting');
const { createTransport } = require("nodemailer");

// Environment variables for sensitive data
const { EMAIL_USER, EMAIL_PASS } = process.env;

if (!EMAIL_USER || !EMAIL_PASS) {
    console.error("Email credentials are missing.");
    process.exit(1); // Exit the process if credentials are missing
}

const transporter = createTransport({
    host: 'mail.gntc-ks.com',
    port: 465,
    secure: true,
    auth: {
       user: 'takime@gntc-ks.com',
        pass: 'Calendari2024'
    }
});

// Example usage:
// transporter.sendMail({ ... }, (error, info) => { ... });



const addMeeting = (req, res) => {
    const {clients, start, end, color, event_id, title, createdBy} = req.body;
    const newMeeting = new meeting({clients, start, end, color, event_id, title, createdBy});
    newMeeting.save().then(() => {
        clients.forEach(client => {
                transporter.sendMail({
                    from: 'takime@gntc-ks.com',
                    to: clients[0],
                    subject: `${title}`,
                    html: `<h1 style="font-size: 20px;">Përshëndetje ${client},</h1><p style="font-size: 18px;">
Ju jeni caktuar për të marrë pjesë në këtë takim që është planifikuar me datën ${new Date(start).toLocaleDateString()} në ora ${new Date(start).toLocaleTimeString()}.<br /><br />
Ju lutemi të siguroheni që të jeni të pranishëm 5 min para kohës të caktuar.<br /><br />
Faleminderit dhe ju presim në takim.<br /><br />
Me respekt,<br /><br />
Gntc Group</p>
<div>
    <img src="cid:logo">
    <div>
   <p> T: +383 49 77 77 55</p>
<p>Rr. Prishtinë – Gjilan, nr. 34, Veternik</p>
<p>10000 Prishtinë, Kosovë</p>
</div>
</div>`,
                    attachments: [{
                        filename: 'Logo.png',
                        path: __dirname + '/logo.png',
                        cid: 'logo'
                    }]
                }).then(function (info) {
                    console.log(info);
                }).catch(function (error) {
                    console.log(error);
                })
            }
        );
        res.json('Meeting added')
    }).catch((error) => res.status(400).json('Error: ' + error));
}

const getMeetings = (req, res) => {
    meeting.find().then((meetings) => res.json(meetings)).catch((error) => res.status(400).json('Error: ' + error));
}

const getMeeting = (req, res) => {
    meeting.findById(req.params.id).then((meeting) => res.json(meeting)).catch((error) => res.status(400).json('Error: ' + error));
}

const deleteMeeting = (req, res) => {
    meeting.deleteOne({event_id: req.params.id}).then(() => res.json('Meeting deleted')).catch((error) => res.status(400).json('Error: ' + error));
}

const updateMeeting = (req, res) => {
    meeting.findById(req.params.id).then((meeting) => {
            meeting.clients = req.body.clients;
            meeting.start = req.body.start;
            meeting.end = req.body.end;
            meeting.color = req.body.color;
            meeting.event_id = req.body.event_id;
            meeting.title = req.body.title
            meeting.editedBy = req.body.editedBy;
            meeting.save().then(() => res.json('Meeting updated')).catch((error) => res.status(400).json('Error: ' + error));
        }
    ).catch((error) => res.status(400).json('Error: ' + error));
}

const approveMeeting = (req, res) => {
    meeting.findById(req.params.id).then((meeting) => {
            meeting.approve = 'true'
            meeting.save().then(() => res.json('Meeting updated')).catch((error) => res.status(400).json('Error: ' + error));
        }
    ).catch((error) => res.status(400).json('Error: ' + error));
}

const disApproveMeeting = (req, res) => {
    meeting.findById(req.params.id).then((meeting) => {
            meeting.approve = 'false'
            meeting.save().then(() => res.json('Meeting updated')).catch((error) => res.status(400).json('Error: ' + error));
        }
    ).catch((error) => res.status(400).json('Error: ' + error));
}

module.exports = {addMeeting, getMeetings, getMeeting, deleteMeeting, updateMeeting, approveMeeting, disApproveMeeting};
