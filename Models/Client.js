const mongoose = require('mongoose')

const ClientSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    company:{
      type:String,
      required:true,
    },
    phoneNumber:{
        type:String,
        required:true
    }
})

const Client = mongoose.model('Client',ClientSchema);

module.exports = Client;