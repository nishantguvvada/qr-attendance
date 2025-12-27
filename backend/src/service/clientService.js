const Client = require('../models/client');

const createClient = async (email) => {

    const client = await Client.create({
        name: `client-${email}`,
        email: email,
        createdAt: new Date(),
    });

    return client
}

const getClients = async () => {

    const clients = await Client.aggregate([
        {
            $addFields: {
                clientIdStr: { $toString: "$_id" } 
            }
        },
        {
            $lookup: {
                from: 'memberships',
                localField: 'clientIdStr',
                foreignField: 'clientId',
                as: 'membership'
            }
        },
        {
            $unwind: {
                path: '$membership',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $addFields: {
                planIdObj: { $toObjectId: "$membership.planId" }
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
                name: 1,
                email: 1,
                membershipDuration: "$plan.duration", // From Plan table
                membershipStatus: "$membership.status",
                endDate: "$membership.endDate",     // From Membership table
                planName: "$plan.name",             // From Plan table
                planPrice: "$plan.price",           // From Plan table
                paymentId: "$membership.paymentId"  // From Membership table
            }
        }
    ]);

    return clients;
}

module.exports = {
    createClient: createClient,
    getClients: getClients
}