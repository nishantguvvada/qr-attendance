const express = require('express');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const validateRequest = require('../middleware/validation');
const planSchema = require('../schemas/planSchema');
const plansController = require('../controllers/plansController');

const plansRouter = express.Router();

plansRouter.post('/create', authenticate, authorize("super-admin"), validateRequest(planSchema.createSchema), plansController.createPlan);

plansRouter.get('/list', authenticate, authorize("super-admin", "admin"), plansController.getPlans);

plansRouter.get('/:id', authenticate, authorize("super-admin"), plansController.getPlanById);

plansRouter.put('/:id', authenticate, authorize("super-admin"), validateRequest(planSchema.updateSchema), plansController.updatePlan);

module.exports = plansRouter;