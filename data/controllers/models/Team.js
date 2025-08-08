// volunteer schema
const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: String,
    role: String,
    description: String,
    image: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    createdAt: String,
    updatedAt: String
})

module.exports = mongoose.model('team', teamSchema);