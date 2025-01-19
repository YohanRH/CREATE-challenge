const express = require("express");
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const ejsMate = require('ejs-mate');
const fs = require("fs")
const csv = require('csv-parser');
// Database Imports
const {createTable, importCSV, checkTableExists, dropTable} = require('./data/db.js')
const dataRoutes = require('./routes/dataRoutes.js')

// Set up Express
const app = express();
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up Static Folder with Javascript and Styles
const static_files_router = express.static('static')
app.use( static_files_router ) 

// Initialize Database 
//dropTable(); //remove when it finally works

checkTableExists((exists) => {
    if (!exists) {
        console.log('Table "exercises" does not exist. Creating and importing data...');
        createTable(); // Create the table
        importCSV('./data/table_processed.csv'); // Import CSV data
    } else {
        console.log('Table "exercises" already exists. Skipping data import.');
    }
});



// Routes
app.use('/api', dataRoutes);

app.get('/', (req,res)=>{ 
    res.render("pages/landing")
})


app.listen(3000, () => {
    console.log('Serving on port 3000')
});
