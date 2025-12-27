const Razorpay = require('razorpay')
const Plans = require('../models/plans');
const Payment = require('../models/payment');
const dotenv = require('dotenv');
dotenv.config();

const razorpay = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET
});

const createPayment = async ({adminId, planId, clientEmail}) => {

    const plan = await Plans.findById(planId);

    if(!plan) throw new Error("Plan not found.");

    const payment = await Payment.create({
        adminId,
        clientEmail,
        planId,
        amount: plan.price,
        status: "pending",
        createdAt: new Date().getTime()
    });

    const link = await razorpay.paymentLink.create({
        amount: plan.price * 100,
        currency: "INR",
        description: `Payment for ${plan.name}`,
        customer: { email: clientEmail },
        callback_url: "http://localhost:5173/home",
        callback_method: "get"
    });

    payment.paymentLinkId = link.id;
    await payment.save();

    return { paymentLink: link.short_url, paymentLinkId: link.id };
}

const updatePayment = async (paymentLinkId, entityId = undefined) => {

    const payment = await Payment.findOne({ paymentLinkId: paymentLinkId });

    if(!payment) throw new Error("Payment not found");

    payment.status = "completed";

    if(entityId) {

        payment.transactionId = entityId;

    } else {

        payment.transactionId = `manual-${paymentLinkId}`;

    }


    await payment.save();

    return payment;

}

module.exports = {
    createPayment: createPayment,
    updatePayment: updatePayment
}