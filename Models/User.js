const mongoose = require('mongoose')
const { updateSearchIndex } = require('./Meeting')

const userSchema = mongoose.Schema({
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        require: true
    },
    name:{
        type:String,
        require:true
    }
})

const User = mongoose.model('Users', userSchema)
module.exports = User