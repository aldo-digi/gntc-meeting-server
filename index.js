const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require("cors");
const dotenv = require("dotenv");

const app = express()
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: true}))

dotenv.config();

const clientRoutes = require('./Routes/Client');
app.use('/client', clientRoutes);
const meetingRoutes = require('./Routes/Meeting');
app.use('/meeting', meetingRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`App Listening at Port ${port}`)
})

const DB = "mongodb+srv://Khizer:khizer1120@geez-database.rlvazjq.mongodb.net/retryWrites=true&w=majority"

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Database connected"))
    .catch((error) => console.log(error.message));