const mongoose = require('mongoose');

const Client = mongoose.model('Client', {
    name: String,
    email: { type: String, unique: true },
    phone: Number,
    createdAt: Date
});

module.exports = Client;