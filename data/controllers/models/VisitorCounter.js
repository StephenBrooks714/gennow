const mongoose = require("mongoose");
const Schema = mongoose.Schema

const visitorSchema = new Schema ({
    ipAddress: String,
    visitedAt: { type: Date, default: Date.now },
})

const visitor = mongoose.model('visitor', visitorSchema);
module.exports = visitor;