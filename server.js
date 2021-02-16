// Setup empty JS object to act as endpoint for all routes
let projectData = {}; // Here we save the most recent entry

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Dependencies*/
const bodyParser = require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const host = 'localhost';
const port = 8010;
var server = app.listen(port, host, function () {
    console.log(`running on localhost: ${port}`)
});

// Initialize all route with a callback function
app.get('/lastEntry', getLastEntry)
// Callback function to complete GET '/all'
function getLastEntry (request, response) {
    response.setHeader("Content-Type", "application/json");
    response.end(JSON.stringify(projectData));
}

// Post Route
app.post('/lastEntry', bodyParser.json(), saveLastEntry)

function saveLastEntry(request, response) {
    response.setHeader("Content-Type", "application/json");
    
    let lastEntry = request.body;
    projectData = lastEntry;
    response.end(JSON.stringify(projectData));
}