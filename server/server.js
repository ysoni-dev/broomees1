const mongoose= require("mongoose")
require('dotenv').config()

const URL = "mongodb+srv://user123:user123@mycluster0.trz1owf.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log('mongodb is connected')
}).catch((error)=>{
    console.log(error)
})