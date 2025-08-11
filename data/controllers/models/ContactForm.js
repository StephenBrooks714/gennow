const mongoose = require("mongoose");
const Schema = mongoose.Schema

const ContactFormSchema = new Schema ({
    adminName: String,
    email: String,
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    datePosted:{
        type: Date,
        default: new Date()
    },
})

const ContactForm = mongoose.model('ContactForm', ContactFormSchema);
module.exports = ContactForm;