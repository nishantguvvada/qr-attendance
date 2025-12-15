const errorHandler = (err, req, res, next) => {

    return res.status(500).json({ error: "Internal Server Error", message: err });

}

module.exports = errorHandler;