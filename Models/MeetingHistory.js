const mongoose = require('mongoose');

const MeetingHistorySchema = new mongoose.Schema({
    clients:{
        type:Array,
        required:true,
        default:[]
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
    },
    title:{
        type:String,
        required:true
    },
    approve:{
        type:String,
        required:true,
        default:'none'
    },
    createdBy:{
        type:String,
    },
    editedBy:{
        type:String,
    }
})

const MeetingHistory = mongoose.model('MeetingHistory',MeetingHistorySchema);

module.exports =  MeetingHistory;
