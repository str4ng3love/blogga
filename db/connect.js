const mongoose = require('mongoose')

const ConnectDB = (uri)=>{
    return mongoose.connect(uri)
}


module.exports = ConnectDB