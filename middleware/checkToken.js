const jwt = require('jsonwebtoken');

const isTokenValid = (token) => {
    console.log('token', token);
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

module.exports = { isTokenValid };
