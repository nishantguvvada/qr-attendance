const paymentService = require('../service/paymentService');
const clientService = require('../service/clientService');
const emailService = require('../service/emailService')

const createPayment = async (req, res) => {

    try {

        const { planId, clientEmail } = req.body;

        const payment = await paymentService.createPayment({ adminId: req.user.id, planId: planId, clientEmail: clientEmail });

        return res.status(200).json({ success: true, paymentLink: payment.paymentLink, paymentLinkId: payment.paymentLinkId });

    } catch(err) {

        return res.status(400).json({ error: err.message });

    }
}

const manualPayment = async (req, res) => {

    try {

        const updatedPayment = await paymentService.updatePayment(req.body.paymentLinkId);

        const { client, token } = await clientService.createClient(updatedPayment.planId, updatedPayment.clientEmail, updatedPayment._id);

        await emailService.sendQREmail(client.clientEmail, token);

        return res.status(200).json({ success: true, paymentId: updatedPayment._id, client: client  });

    } catch(err) {

        console.log(err);
        return res.status(400).json({ error: err });

    }


}

module.exports = {
    createPayment: createPayment,
    manualPayment: manualPayment
}