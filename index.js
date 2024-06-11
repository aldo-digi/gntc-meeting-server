const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const multer = require("multer");
const cors = require("cors");
const session = require('express-session');
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use("/assets", express.static(path.join(__dirname, "public/assets")));
app.use('/public', express.static(path.join(__dirname, 'public/CVs')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 15 * 60 * 1000 } // 15 minutes for session expiration
}));

// Routes
const agentRoutes = require('./Routes/Agent');
app.use('/agent', agentRoutes);
const recruiterRoutes = require('./Routes/Recruiter');
app.use('/recruiter', recruiterRoutes);
const jobRoutes = require('./Routes/Job');
app.use('/job', jobRoutes);
const userRoutes = require('./Routes/User');
app.use('/user', userRoutes);
const invoiceRoutes = require('./Routes/Invoice');
app.use('/invoice', invoiceRoutes);
const appointmentRoutes = require('./Routes/Appointment');
app.use('/appointment', appointmentRoutes);
const notificationRoutes = require('./Routes/Notification');
app.use('/notification', notificationRoutes);
const docAppRoutes = require('./Routes/Document');
app.use('/document', docAppRoutes);
const emgAppRoutes = require('./Routes/Emigration');
app.use('/emigration', emgAppRoutes);

// Route to download CV file
app.get('/download-cv/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, 'public/CVs', filename);
  if (fs.existsSync(filePath)) {
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    res.setHeader('Content-Type', 'application/pdf');
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } else {
    res.status(404).send('File not found');
  }
});

app.get('/download-recruiter-doc/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, 'uploads', filename);
  if (fs.existsSync(filePath)) {
    const fileExtension = path.extname(filename).toLowerCase();
    let contentType = '';
    switch (fileExtension) {
      case '.pdf':
        contentType = 'application/pdf';
        break;
      case '.doc':
        contentType = 'application/msword';
        break;
      case '.docx':
        contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        break;
      case '.jpg':
      case '.jpeg':
        contentType = 'image/jpeg';
        break;
      case '.png':
        contentType = 'image/png';
        break;
      default:
        contentType = 'application/octet-stream';
    }
    res.setHeader('Content-Disposition', `attachment; filename=${filename.split("-_-")[1]}`);
    res.setHeader('Content-Type', contentType);
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } else {
    res.status(404).send('File not found');
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`App Listening at Port ${port}`);
});

const DB = process.env.MONGO_URI;
mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("Database connected"))
  .catch((error) => console.log(error.message));

// Route to reschedule appointment
app.post('/appointment/reschedule', async (req, res) => {
  const { appointment, newTime, newDate } = req.body;
  try {
    const retrievedAppointment = await Appointment.findById(appointment._id);
    if (!retrievedAppointment) {
      return res.status(404).send({ message: 'Appointment not found' });
    }
    retrievedAppointment.time = newTime;
    retrievedAppointment.date = newDate;
    await retrievedAppointment.save();
    res.status(200).send({ message: 'Appointment rescheduled successfully', retrievedAppointment });
  } catch (error) {
    res.status(500).send({ message: 'Failed to reschedule appointment' });
  }
});

// Replace this function with actual database logic
async function updateAppointmentTime(appointmentId, newTime) {
  const updatedAppointment = { id: appointmentId, time: newTime };
  return updatedAppointment;
}
