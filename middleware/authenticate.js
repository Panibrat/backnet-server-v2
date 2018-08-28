const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.header('x-auth');
    try {
        const decoded = jwt.verify(token, 'abc123');
    } catch (e) {
        res.status(401).send();
    }
        req.token = token;
        next();
};

module.exports = { authenticate };
