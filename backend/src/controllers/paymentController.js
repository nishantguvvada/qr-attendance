const paymentService = require('../service/paymentService');
const emailService = require('../service/emailService')
const membershipService = require('../service/memberService');

const createPayment = async (req, res) => {

    try {

        const { planId, clientEmail } = req.body;

        const payment = await paymentService.createPayment({ adminId: req.user.id, planId: planId, clientEmail: clientEmail });

        await emailService.sendLinkEmail(req.user.email, payment.paymentLinkId);

        return res.status(200).json({ success: true, paymentLink: payment.paymentLink, paymentLinkId: payment.paymentLinkId });

    } catch(err) {

        return res.status(400).json({ error: err.message });

    }
}

const manualPayment = async (req, res) => {

    try {

        const updatedPayment = await paymentService.updatePayment(req.body.paymentLinkId);

        const { membership, token } = await membershipService.handleMembership(updatedPayment.clientEmail, updatedPayment.planId, updatedPayment._id);

        await emailService.sendQREmail(updatedPayment.clientEmail, token);

        return res.status(200).json({ success: true, paymentId: updatedPayment._id, membership: membership  });

    } catch(err) {

        console.log(err);
        return res.status(400).json({ error: err });

    }

}

module.exports = {
    createPayment: createPayment,
    manualPayment: manualPayment
}