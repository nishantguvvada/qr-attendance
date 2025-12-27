const express = require('express');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const qrController = require('../controllers/qrController');

const qrRouter = express.Router();

qrRouter.get('/', authenticate, authorize("super-admin", "admin"), qrController.verifyQR);

module.exports = qrRouter;