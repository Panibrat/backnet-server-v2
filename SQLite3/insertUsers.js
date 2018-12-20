const bcrypt = require('bcryptjs');

const insertUsersToDataBase = (users, db) => {
    users.map((user) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                db.saveUser(user);
            });
        });
    });
};

module.exports = { insertUsersToDataBase };