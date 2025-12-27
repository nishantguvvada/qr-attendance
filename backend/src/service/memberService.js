const Membership = require('../models/membership');
const Client = require('../models/client');
const planService = require('../service/planService');
const clientService = require('../service/clientService');

const handleMembership = async (email, planId, paymentId) => {

    let client = await Client.findOne({ email: email });

    if (!client) {

        client = await clientService.createClient(email);

    }

    const clientId = client._id;

    const existingMembership = await Membership.findOne({ clientId: clientId }).sort({ createdAt: -1 }).exec();

    if(existingMembership && existingMembership.status !== "expired") { // add logic for adding existing membership days

        existingMembership.status = "expired";
        existingMembership.save();

    }

    const plan = await planService.getPlanById(planId);

    const token = crypto.randomUUID();
    const start = new Date();
    const end = new Date(start); 
    end.setDate(start.getDate() + plan.duration);

    const membership = await Membership.create({
        clientId,
        planId,
        paymentId,
        status: "active",
        startDate: start,
        endDate: end,
        qrToken: token
    });

    return { membership, token };

}

const getMembership = async (token) => {

    const membership = await Membership.aggregate([
        {
            $match: { qrToken: token, endDate: { $gte: new Date() }, status: "active" }
        },
        {
            $addFields: {
                clientIdStr: { $toObjectId: "$clientId" } 
            }
        },
        {
            $lookup: {
                from: 'clients',
                localField: 'clientIdStr',
                foreignField: '_id',
                as: 'client'
            }
        },
        {
            $unwind: {
                path: '$client',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $addFields: {
                planIdObj: { $toObjectId: "$planId" }
            }
        },
        {
            $lookup: {
                from: 'plans',
                localField: 'planIdObj',
                foreignField: '_id',
                as: 'plan'
            }
        },
        {
            $unwind: {
                path: '$plan',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $project: {
                _id: 1,
                name: "$client.name",
                email: "$client.email",
                clientId: "$client._id",
                planDuration: "$plan.duration",
                status: 1,
                startDate: 1,
                endDate: 1,
                planName: "$plan.name",
                planPrice: "$plan.price",
            }
        }
    ]);

    return membership;
}

module.exports = {
    handleMembership: handleMembership,
    getMembership: getMembership
}