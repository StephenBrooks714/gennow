const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator')

const UsersSchema = new Schema ({
    username: {
        type: String,
        unique: [true,'Please provide a different username'],
        required: true
    },
    fName: {
        type: String,
        unique: [true,'Please a different first name'],
        required: true
    },
    lName: {
        type: String,
        unique: [true,'Please a different last name'],
        required: true
    },
    email: {
        type: String,
        unique: [true,'Please choose a different email'],
        required: true
    },
    password: {
        type: String,
        required: [true,'Please provide password']
    },
    joinedDate: {
        type: Date,
        default: new Date
    }
})

UsersSchema.plugin(uniqueValidator)

UsersSchema.pre('save',function(next){
    const user = this
    bcrypt.hash(user.password, 10,(error, hash)=>{
        user.password = hash
        next()
    })
})

const User = mongoose.model('User',UsersSchema);

module.exports = User;