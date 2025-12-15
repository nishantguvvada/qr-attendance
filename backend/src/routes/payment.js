const express = require('express');
const authorize = require('../middleware/authorize');
const authenticate = require('../middleware/authenticate');
const validateRequest = require('../middleware/validation');
const paymentSchema = require('../schemas/paymentSchema');
const paymentController = require('../controllers/paymentController');

const paymentRouter = express.Router();

paymentRouter.post('/create', authenticate, authorize("super-admin", "admin"), validateRequest(paymentSchema.createSchema), paymentController.createPayment);

paymentRouter.post('/manual', authenticate, authorize("super-admin", "admin"), paymentController.manualPayment);

module.exports = paymentRouter;