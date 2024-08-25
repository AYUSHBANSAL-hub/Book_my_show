const mongoose = require('mongoose');
const env=require('dotenv').config();

const connect = ()=>{
    return mongoose.connect(`mongodb+srv://bansalayush2002:ayushbansal1@bookmyshowayush.ygospdy.mongodb.net/`)
}

module.exports=connect;
