const express = require('express');
const cors = require('./cors');
const db = require('./db');
const app = express();
const bodyParser = require('body-parser');

app.use(cors);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/createdbandtable', (req, res) => {
    let createDBSql = 'CREATE DATABASE IF NOT EXISTS swftbox';
    let createTableSql = 'CREATE TABLE IF NOT EXISTS swftbox.events(id int AUTO_INCREMENT, name VARCHAR(255),  starttime DATETIME, endtime DATETIME, PRIMARY KEY (id))';

    db.query(createDBSql, (err, results) => {
        if (err) throw err;
        console.log(results);
        db.query(createTableSql, (err, results) => {
            if (err) throw err;
            console.log(results);
            res.send('database & table created');
        })
    });
});


app.post('/createevent', (req, res) => {
    
    const eventName = req.body.eventName;
    const eventStartTime = req.body.eventStartTime;
    const eventEndTime = req.body.eventEndTime;
    console.log(eventStartTime, eventEndTime);
    const checkExistingEventSql = `SELECT COUNT(*) as eventCount FROM swftbox.events WHERE starttime BETWEEN '${eventStartTime}' and '${eventEndTime}' OR endtime BETWEEN '${eventStartTime}' and '${eventEndTime}'  OR ( starttime < '${eventStartTime}' and endtime > '${eventEndTime}' )`;
    db.query(checkExistingEventSql, (err1, results) => {
        if (err1) throw err;
        if (results[0]['eventCount'] > 0) {
            res.send('exist');
        }
        else {
            const createEventSql = `INSERT INTO swftbox.events (name, starttime, endtime) VALUES ( '${eventName}', '${eventStartTime}' , '${eventEndTime}')`;
            db.query(createEventSql, (err2, results) => {
                if (err2) throw err;
                res.send('success');
            });
        }
    });    
});

const PORT = 3400 || process.env.port;
app.listen(PORT, () => {
    console.log(`Port started on ${PORT}`);
});