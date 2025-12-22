const express = require('express');
const authorize = require('../middleware/authorize');
const authenticate = require('../middleware/authenticate');
const clientController = require('../controllers/clientController');

const clientRouter = express.Router();

clientRouter.get('/list', authenticate, authorize("super-admin", "admin"), clientController.listClients);

module.exports = clientRouter;