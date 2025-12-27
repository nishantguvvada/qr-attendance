const mongoose = require('mongoose');

const Membership = mongoose.model('Membership', {
    clientId: String,
    planId: String,
    paymentId: String,
    status: String,
    startDate: Date,
    endDate: Date,
    createdAt: Date,
    qrToken: { type: String, unique: true }
});

module.exports = Membership;