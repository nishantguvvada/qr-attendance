const crypto = require('crypto');
const dotenv = require('dotenv');
dotenv.config();

const validateTransaction = (payload, signature) => {    

    const expected = crypto.createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
        .update(JSON.stringify(payload))
        .digest("hex");

    if(expected !== signature) {
        return false;
    }

    return true;
}

module.exports = {
    validateTransaction: validateTransaction
}