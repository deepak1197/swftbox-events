const mysql = require('mysql');
const db = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root'
    // database : 'swftbox'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log(`connected to Database`);
});

module.exports = db;