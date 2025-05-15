const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Email', emailSchema);
