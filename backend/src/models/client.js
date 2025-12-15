const mongoose = require('mongoose');

const Client = mongoose.model('Client', {
    clientName: String,
    clientEmail: String,
    planId: String,
    paymentId: String,
    membershipStatus: String,
    startDate: Date,
    endDate: Date,
    createdAt: Date,
    qrToken: { type: String, unique: true }
});

module.exports = Client;