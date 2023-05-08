const mongoose = require('mongoose')

const Schema = mongoose.Schema


const userSchema = new Schema({
    user: {
        type: String,
        unique: [true, 'User name taken.'],
        required: [true, 'User name is required.'],
        minLength: [3, `User name must be at least 3 characters long.`],
        validate: {
            validator:(v)=>{
                if(v.match(/[^-_a-zA-Z0-9_]/g)){
                    return false
                } else {
                    return v
                }
                
            },
            message: props =>`${props.value} is not a valid user name, please use only letters and digits.`
        }
    },
    password: {
        type: String,
        required: [true, 'Enter password.'],
        minLength: [8, 'Password must be at least 8 characters long.'],
        maxLength: [30, `Password must not surpass 30 characters.`],
    },
    nickName: {
        type: String,
        default: this.user,
    },
    createdAt:{
        type: Date,
        required: true,
        default: Date.now,
    },
    posts:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Post"
    },
    meta: {
        lastVisited: {
            default: Date.now,
            type: Date
        },
        isOnline: {
            type: Boolean,
            default: false,
        },
        friendsList: {
            type: [mongoose.Schema.Types.ObjectId
                ],
            ref: 'User'
        }

    }
})




const User = mongoose.model('User', userSchema)

module.exports = User 