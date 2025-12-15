const zod = require('zod');

const createSchema = zod.object({
    clientEmail: zod.email(),
    planId: zod.string()
});

module.exports = {
    createSchema: createSchema
}