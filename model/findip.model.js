const mongoose = require("mongoose")
const ipSchema = mongoose.Schema({
    user:{
        type:String, required:true
    },
    ip:{
        type:String,
        required:true,
        unique:true
    },
    city:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    region:{
        type:String
    },
    timezone:{
        type:String,
        required:true
    },
    timestamp:{
        type:Date,
        default:Date.now
    }

})

const IpAddress = mongoose.model("ip",ipSchema)

module.exports = IpAddress