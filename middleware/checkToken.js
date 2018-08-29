const jwt = require('jsonwebtoken');

const isTokenValid = (token) => {
    try {
        const decoded = jwt.verify(token, 'abc123');
        return true;
    } catch (e) {
        return false;
    }
};

module.exports = { isTokenValid };
