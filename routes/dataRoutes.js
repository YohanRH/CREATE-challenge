const express = require('express');
const { db } = require('../data/db');
const router = express.Router();


// API endpoint to fetch data
router.get('/data', (req, res) => {
    db.all('SELECT * FROM exercises', [], (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.json(rows);
        }
    });
});

module.exports = router;
