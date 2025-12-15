const Plans = require('../models/plans');
const dotenv = require('dotenv');
dotenv.config();

const create = async ({ name, description, duration, price }) => {
        
    const exists = await Plans.findOne({ name: name });

    if(exists) {

        throw new Error("Plan already exists, try renaming or updating the current plan.");

    }
    
    const newPlan = await Plans.create({
        name: name,
        description: description,
        duration: duration,
        price: price,
        createdAt: new Date().getTime()
    });

    return newPlan;

}

const getPlans = async () => {

    const plans = await Plans.find({});

    return plans;

}

const getPlanById = async (id) => {

    const plan = await Plans.findById(id);

    if (!plan) {
        throw new Error("Plan not found.");
    }

    return plan;
}

const updatePlan = async (id, payload) => {

    const plan = await Plans.findById(id);

    if (!plan) {
        throw new Error("Plan not found.");
    }

    if (payload.name) plan.name = payload.name;
    if (payload.description) plan.description = payload.description;
    if (payload.duration) plan.duration = payload.duration;
    if (payload.price) plan.price = payload.price;

    const saved = await plan.save();
    return saved;

}

module.exports = {
    create: create,
    getPlans: getPlans,
    getPlanById: getPlanById,
    updatePlan: updatePlan
}