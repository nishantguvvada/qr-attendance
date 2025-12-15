const mongoose = require('mongoose');

const Payment = mongoose.model('Payment', {
    adminId: mongoose.Schema.Types.ObjectId,
    clientEmail: { type: String, required: true },
    planId: { type: mongoose.Schema.Types.ObjectId, ref: "Plans", required: true },
    status: {
        type: String,
        enum: ["pending", "completed", "failed"],
        default: "pending"
    },
    amount: {
        type: mongoose.Schema.Types.Decimal128,
        set: v => mongoose.Types.Decimal128.fromString(v.toString())
    },
    paymentLinkId: String,
    transactionId: String,
    createdAt: Date
});

module.exports = Payment;