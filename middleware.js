const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    if (!req.headers.authorization) {
        res.status(403).send({
            message: "No token provided!"
        })
    }
    const token = req.headers.authorization.split(' ')[1]

    try {
        const decoded = jwt.verify(token, 'PRIV_123');
        req.user = decoded;
    } catch (error) {
        return res.status(401).send("Invalid Token");
    }
    return next();
}

module.exports = verifyToken;