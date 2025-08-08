// volunteer schema
const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
    name: String,
    role: String,
    description: String,
    image: String,
    createdAt: String,
    updatedAt: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }
})

module.exports = mongoose.model('volunteers', volunteerSchema);