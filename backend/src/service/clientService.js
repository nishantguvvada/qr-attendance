const Plan = require('../models/plans');
const Client = require('../models/client');

const createClient = async (planId, clientEmail, paymentId) => {

    const plan = await Plan.findOne({ _id: planId });
    
    const token = crypto.randomUUID();
    const start = new Date();
    const end = new Date(start); 
    end.setDate(start.getDate() + plan.duration); 
    

    const existingClient = await Client.findOne({ clientEmail: clientEmail }).sort({ createdAt: -1 }).exec();

    if(existingClient) {

        existingClient.membershipStatus = "expired";
        existingClient.save();

    }

    const client = await Client.create({
        clientName: `client-${paymentId}-${planId}`,
        clientEmail: clientEmail,
        planId: planId,
        paymentId: paymentId,
        membershipStatus: "active",
        startDate: start,
        endDate: end,
        createdAt: new Date(),
        qrToken: token
    });

    return { client: client, token: token}
}

const getClients = async () => {

    const clients = await Client.aggregate([
        {
            $addFields: {
                planIdConverted: { $toObjectId: "$planId" }
            }
        },
        {
            $lookup: {
                from: 'plans',
                localField: 'planIdConverted',
                foreignField: '_id',
                as: 'planDetails'
            }
        },
        {
            $unwind: {
                path: '$planDetails',
                preserveNullAndEmptyArrays: true
            }
        }
    ]);

    return clients;
}

module.exports = {
    createClient: createClient,
    getClients: getClients
}