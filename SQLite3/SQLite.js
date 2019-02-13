const sqlite3 = require('sqlite3').verbose();
const {
    DATABASE_NAME,
    DATABASE_LOCATION,
    TABLE_DAY_CONSUMPTION,
    TABLE_TREND_DATA,
    TABLE_USERS,
} = require('./config');

const db = new sqlite3.Database(DATABASE_LOCATION + DATABASE_NAME, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log(`[SQLite3] Connected to database: ${DATABASE_LOCATION}${DATABASE_NAME}`);
    db.run(`CREATE TABLE IF NOT EXISTS ${TABLE_DAY_CONSUMPTION}(timeStamp integer, title text, value integer)`);
    db.run(`CREATE TABLE IF NOT EXISTS ${TABLE_TREND_DATA}(timeStamp integer, title text, value integer)`);
    db.run(`CREATE TABLE IF NOT EXISTS ${TABLE_USERS}(email text NOT NULL UNIQUE, password text, role text)`);
});

class SQLite {
    constructor(currentDb) {
        this.db = currentDb;
    }

    savePointToTable(point, table) {
        const timeStamp = new Date().getTime();
        let sql = `INSERT INTO ${table}(timeStamp, title, value) VALUES(?,?,?)`;
        this.db.run(sql, [timeStamp, point.title, point.value], function(err) {
            if (err) {
                return console.error(err.message);
            }
        });
    }

    saveUser(user) {
        const { email, password, role } = user;
        let sql = `INSERT INTO ${TABLE_USERS}(email, password, role) VALUES(?,?,?)`;
        this.db.run(sql, [email, password, role], function(err) {
            if (err) {
                return console.error(err.message);
            }
        });
    }

    findByTitleInTable(title, startTime, endTime, table, callback) {
        let sql =
            `SELECT DISTINCT timeStamp, value 
            FROM ${table}
            WHERE title = ?
            AND timeStamp >= ${startTime}
            AND timeStamp <= ${endTime}
            ORDER BY timeStamp`;

        this.db.all(sql, [title], (err, rows) => {
            if (err) {
                throw err;
            }
            callback(rows);
        });
    }

    updateData(dataPoint) {
        if (dataPoint.trend) {
            this.savePointToTable(dataPoint, TABLE_TREND_DATA);
        }
    }

    getConsumptionTrendData(title, startTime, endTime, action) {
        const callback = (data) => {
            const convertedData = data.map((savedPoint) => {
                return { x: savedPoint.timeStamp, y: savedPoint.value };
            });
            action(convertedData);
        };
        this.findByTitleInTable(title, startTime, endTime, TABLE_DAY_CONSUMPTION, callback);
    }
    getTrendData(title, startTime, endTime, action) {
        const callback = (data) => {
        const chartItem = {
            title: title,
            chart: data,
        };
            action(chartItem);
        };
        this.findByTitleInTable(title, startTime, endTime, TABLE_TREND_DATA, callback);
    }

    findUser(userEmail, callback) {
        let sql =
            `SELECT email, password, role 
            FROM ${TABLE_USERS}
            WHERE email = ?
            LIMIT 1`;

        this.db.all(sql, [userEmail], (err, rows) => {
            if (err) {
                return callback(err);
            }
            if (rows.length < 1) {
                return callback('no such user :(');
            }
            const user = rows[0];
            return callback(null, user);
        });
    }
    closeDb() {
        this.db.close((err) => {
            if (err) {
                return console.error(err.message);
            }
            console.log('Close the database connection.');
        });
    }
}

module.exports = new SQLite(db);
