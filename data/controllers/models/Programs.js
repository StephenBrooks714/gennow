// program schema
const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    createdAt: String,
    updatedAt: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }
})

module.exports = mongoose.model('programs', programSchema);