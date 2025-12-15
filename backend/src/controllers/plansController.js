const planService = require('../service/planService');

const createPlan = async (req, res) => {

    try {

        const { name, description,  duration, price } = req.body;

        const plan = await planService.create({ name, description,  duration, price });

        return res.status(200).json({ message: `New Plan Created! ${plan._id}` });

    } catch(err) {

        return res.status(403).json({ error: err.message });

    }
}

const getPlans = async (req, res) => {

    try {

        const plans = await planService.getPlans();

        return res.status(200).json({ plans: plans });

    } catch(err) {

        return res.status(403).json({ error: err.message });
    }
}

const getPlanById = async (req, res) => {

    try {

        const plan = await planService.getPlanById(req.params.id);

        return res.status(200).json({ plan: plan });

    } catch(err) {
        
        return res.status(403).json({ error: err.message });
    
    }
}

const updatePlan = async (req, res) => {

    try {

        const updatedPlan = await planService.updatePlan(req.params.id, req.body);

        return res.status(200).json({ success: true, plan: updatedPlan });

    } catch(err) {

        return res.status(403).json({ error: err.message });
        
    }
}

module.exports = {
    createPlan: createPlan,
    getPlans: getPlans,
    getPlanById: getPlanById,
    updatePlan: updatePlan
}