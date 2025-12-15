const zod = require('zod');

const signupSchema = zod.object({
    name: zod.string(),
    email: zod.email(),
    password: zod.string().min(6),
    role: zod.union([zod.literal("admin"), zod.literal("super-admin")])
});

const signinSchema = zod.object({
    email: zod.email(),
    password: zod.string().min(6),
});

module.exports = {
    signupSchema: signupSchema,
    signinSchema: signinSchema
};