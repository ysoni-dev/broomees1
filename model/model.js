const mongoose = require('mongoose')

const login = new mongoose.Schema({
    firstname:{
        type:String,
        minLength: 1,
    },
    lastname:{
        type:String,
        minLength:1,
    },
    email:{
        type:String,
    },
    username:{
        type:String,
        unique:true
    },
    password:{
        type:String,
        minLength:6
    },
    confirmpassword:{
        type:String,
        minLength:6
    }
})

const mylogin = new mongoose.model('mylogin', login)

module.exports= mylogin;;