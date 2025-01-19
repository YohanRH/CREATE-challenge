const express = require("express");
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const ejsMate = require('ejs-mate');
const fs = require("fs")
const csv = require('csv-parser');

// Set up Express
const app = express();
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Set up Static Folder with Javascript and Styles
const static_files_router = express.static('static')
app.use( static_files_router ) 

// Initialize Database 
const db = new sqlite3.Database('database.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to SQLite database.');
    }
});


app.use(express.urlencoded({ extended: true }));

app.get('/', (req,res)=>{ 
    res.render("pages/landing")
})

app.listen(3000, () => {
    console.log('Serving on port 3000')
});
