const authenticate = (req, res, next) => {
    const token = req.header('x-auth');

    if (token === 'token') {
        req.token = token;
        next();
    } else {
        res.status(401).send();
    }
};

module.exports = { authenticate };
