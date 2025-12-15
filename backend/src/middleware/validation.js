const validateRequest = (schema) => {
    return (req, res, next) => {
    
        try {

            const parsedPayload = schema.safeParse(req.body);

            if(!parsedPayload.success) {

                return res.status(400).json({ error: parsedPayload.error.issues[0].message });

            } else {

                next();

            }
        } catch(err) {
            
            return res.status(400).json({ error: err.message });
            
        }

    }
}
module.exports = validateRequest;