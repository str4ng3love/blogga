const mongoose = require('mongoose')

const Schema = mongoose.Schema
const mailingListSchema = new Schema({
    email: {
        type: String,
        unique: [true, `Email taken.`]
    }
})
const MailingList = mongoose.model('MailingList', mailingListSchema)

module.exports = MailingList