const mongoose = require('mongoose')

const Schema = mongoose.Schema

const postSchema = new Schema({
    title: {
        type: String,
        required: [true, `Title is required.`],
        minlength: [6, `Title must be at least 6 characters long.`],
        maxlength: [30, `Title must not exceed 30 characters.`]
    },
    paragraph1: {
        type: String,
        required: [true, `Post must contain at least 1 paragraph.`],
        minlength: [10, `Paragraph is too short.`],
        maxlength: [2500, `Must not exceed 2500 characters.`]
    },
    paragraph2: {
        type: String,
        required: false,
        maxlength: [2500, `Must not exceed 2500 characters.`]
    },
    paragraph3: {
        type: String,
        required: false,
        maxlength: [2500, `Must not exceed 2500 characters.`]
    },
    img1: {
        type: String,
    },
    img2: {
        type: String,
    },
    meta: {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        postedOn: {
            type: Date,
            required: true,
            default: Date.now
        }
    }
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post