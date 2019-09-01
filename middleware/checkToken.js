const jwt = require('jsonwebtoken');

const isTokenValid = (token) => {
    try {
        const user = jwt.verify(token, 'abc123');
        if (user.role === 'admin') {
            return true;
        } else {
            console.log('User has no rights to change values');
            return false;
        }
    } catch (e) {
        return false;
    }
};

const getUserFromToken = (token) => {
    try {
        return jwt.verify(token, 'abc123');
    } catch (e) {
        return null;
    }
};

module.exports = { isTokenValid, getUserFromToken };
