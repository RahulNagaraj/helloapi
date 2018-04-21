var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Configure the app for body-parser
// let's us grab data from the body of the POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Set up port for the server to listen on
var port = process.env.PORT || 3000;

// Connect to database
mongoose.connect('mongodb://localhost:27017/helloapi');

// API Routes
var router = express.Router();

// Routes will be prefixed with '/api'
app.use('/api', router);

// Test route
router.get('/', function(req, res) {
  res.json({
    message: 'welcome to our API!'
  })
});

// Fire up the server
app.listen(port);

console.log('Server listening on port: ', port);
