const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

const dbPath = path.resolve(__dirname, '../database.db'); // Adjust as necessary
console.log('Using database file:', dbPath);

const db = new sqlite3.Database(dbPath, (err) => {  //making a database.db in the main file
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to SQLite database.');
    }
});

const createTable = () => {
    const createTableSQL = `
        CREATE TABLE IF NOT EXISTS exercises (
            Ind INTEGER PRIMARY KEY,
            Exercise TEXT,
            Difficulty_Level TEXT,
            Target_Muscle_Group TEXT,
            Prime_Mover_Muscle TEXT,
            Primary_Equipment TEXT,
            Secondary_Items INTEGER,
            Posture TEXT,
            Single_or_Double_Arm TEXT,
            Continuous_or_Alternating_Arms TEXT,
            Grip TEXT,
            Load_Position_Ending TEXT,
            Continuous_or_Alternating_Legs TEXT,
            Foot_Elevation TEXT,
            Combination_Exercises TEXT,
            Body_Region TEXT,
            Force_Type TEXT,
            Laterality TEXT,
            Primary_Exercise_Classification TEXT
        );
    `;
    db.run(createTableSQL, (err) => {
        if (err) {
            console.error('Error creating table:', err.message);
        } else {
            console.log('Table "exercises" created or already exists.');
        }
    });
};

const importCSV = (filePath) => {
    const rows = [];
    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => rows.push(row))
        .on('end', () => {
            const placeholders = Object.keys(rows[0]).map(() => '?').join(',');
            const insertSQL = `
                INSERT INTO exercises (${Object.keys(rows[0]).join(',')})
                VALUES (${placeholders})
            `;

            db.serialize(() => {
                rows.forEach((row) => {
                    db.run(insertSQL, Object.values(row), (err) => { //this is basically inserting into sql 
                        if (err) {
                            console.error('Error inserting row:', err.message);
                        }
                    });
                });
                console.log('CSV data imported into SQLite.');
            });
        });
};

const dropTable = () => {
    const dropTableSQL = `DROP TABLE IF EXISTS exercises;`;
    db.serialize(() => {
        db.run(dropTableSQL, (err) => {
            if (err) {
                console.error('Error dropping table:', err.message);
            } else {
                console.log('Table "exercises" has been dropped.');
            }
        });
    });
};

const checkTableExists = (callback) => {
    const query = `SELECT name FROM sqlite_master WHERE type='table' AND name='exercises';`;
    db.get(query, (err, row) => {
        if (err) {
            console.error('Error checking table existence:', err.message);
            callback(false); // Treat as table doesn't exist on error
        } else {
            callback(!!row); // `row` is truthy if the table exists
        }
    });
};

module.exports = { db, createTable, importCSV, checkTableExists, dropTable }; //this file exports the functions createTable, importCSV, and db
