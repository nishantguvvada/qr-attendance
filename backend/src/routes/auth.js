const express = require('express');
const authSchema = require('../schemas/authSchema');
const validateRequest = require('../middleware/validation');
const authController = require('../controllers/authController');

const authRouter = express.Router();

authRouter.post('/signup', validateRequest(authSchema.signupSchema), authController.signup);

authRouter.post('/signin', validateRequest(authSchema.signinSchema), authController.signin);

module.exports = authRouter;