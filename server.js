// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');

// Start up an instance of app
const app = express();
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
const port = 3000;
const listenCallback = () => {
    console.log('server running on port : ' + port);
}
app.listen(port, listenCallback)

// Callback function to complete GET '/getData'
const getDataCallBack = (request, response) => {
    response.send(projectData);
}

// Initialize getData route with a callback function
app.get('/getData', getDataCallBack);

// Post Route
app.post('/postData', postDataCallBack);

//Callback function to complete POST './postData'
function postDataCallBack (request, response) {
    const { temperature, date, userResponse } = request.body;
    projectData.temperature = temperature;
    projectData.date = date;
    projectData.userResponse = userResponse;

    response.send(JSON.stringify(projectData));
}