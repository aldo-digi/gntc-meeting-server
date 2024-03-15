const mongoose = require('mongoose');

const MeetingSchema = new mongoose.Schema({
    client:{
        type:String,
        required:true
    },
    start:{
        type:String,
        required:true
    },
    end:{
        type:String,
        required:true
    },
    color:{
        type:String,
        required:true
    },
    event_id:{
        type:String,
        required:true
    }
})

const Meeting = mongoose.model('Meeting',MeetingSchema);

module.exports =  Meeting;
