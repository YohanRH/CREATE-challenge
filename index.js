const express = require("express");
const path = require('path');
const ejsMate = require('ejs-mate');
const fs = require("fs")

// Set up Express
const app = express();
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Set up Static Folder with Javascript and Styles
const static_files_router = express.static('static')
app.use( static_files_router ) 

app.use(express.urlencoded({ extended: true }));

app.get('/', (req,res)=>{ 
    res.render("pages/landing")
})

app.listen(3000, () => {
    console.log('Serving on port 3000')
});
