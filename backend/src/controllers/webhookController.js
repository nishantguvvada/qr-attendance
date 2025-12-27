const webhookService = require('../service/webhookService');
const paymentService = require('../service/paymentService');
const emailService = require('../service/emailService');
const memberService = require('../service/memberService');

const handleWebhook = async (req, res) => {

    try {

        const validTx = webhookService.validateTransaction(req.body, req.headers["x-razorpay-signature"]);

        if(!validTx) {

            return res.status(400).json({ error: "Invalid Signature" });
        
        }

        if(req.body.event === "payment_link.paid") {

            const updatedPayment = await paymentService.updatePayment(req.body.payload.payment_link.entity.id, req.body.payload.payment.entity.id);

            const { _, token } = await memberService.handleMembership(updatedPayment.clientEmail, updatedPayment.planId, updatedPayment._id);

            await emailService.sendQREmail(updatedPayment.clientEmail, token);
        }

        return res.status(200).json({ status: "ok" });

    } catch(err) {

        console.log(err);
        return res.status(400).json({ error: err });

    }

}

module.exports = {
    handleWebhook: handleWebhook
}