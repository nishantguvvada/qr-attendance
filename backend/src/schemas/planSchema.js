const zod = require('zod');

const createSchema = zod.object({
    name: zod.string(),
    description: zod.string().optional(),
    duration: zod.union([zod.literal(30), zod.literal(90), zod.literal(180), zod.literal(360)]),
    price: zod.number().positive()
});

const updateSchema = zod.object({
    name: zod.string().optional(),
    description: zod.string().optional(),
    duration: zod.union([zod.literal(30), zod.literal(90), zod.literal(180), zod.literal(360)]).optional(),
    price: zod.number().positive().optional()
});

module.exports = {
    createSchema: createSchema,
    updateSchema: updateSchema
};