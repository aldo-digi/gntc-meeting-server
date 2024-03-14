const mongoose = require('mongoose')

const ClientSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true,
    },
    position:{
      type:String,
      required:true,
    },
    city:{
        type:String,
        required:true
    },
    meetings:{
        type:Array,
        required:true,
        default:[],
    }
})

const Client = mongoose.model('Client',ClientSchema);

module.exports = Client;