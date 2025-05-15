const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: String,
    date: String,
    link: String,
    location: String,
    description: String,
    image: String  // optional: add this if using images
});

module.exports = mongoose.model('Event', eventSchema);
