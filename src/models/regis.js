const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name : {
        type:String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique:true
    },
    psw : {
        type:String,
        required: true
    },
    pswrepeat :{
        type:String,
        required: true
    }

})

const Register = new mongoose.model("Register",userSchema);
module.exports = Register;