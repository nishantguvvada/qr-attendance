const express = require('express');
const webhookController = require('../controllers/webhookController');

const webhookRouter = express.Router();

webhookRouter.post('/razorpay', webhookController.handleWebhook);

module.exports = webhookRouter;