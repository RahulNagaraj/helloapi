var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Vehicle = require('./app/models/vehicle');

// Configure the app for body-parser
// let's us grab data from the body of the POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set up port for the server to listen on
var port = process.env.PORT || 3000;

// Connect to database
mongoose.connect('mongodb://localhost:27017/helloapi');

// API Routes
var router = express.Router();

// Routes will be prefixed with '/api'
app.use('/api', router);

// MIDDELWARE - 
// Middleware can be very useful for doing validations. We can log
// things from here or stop the request from continuing in the event
// that the request is not safe.
// middleware to use for all requests
router.use(function (req, res, next) {
  console.log('FYI... There is some process currently going down... ');
  next();
});

// Test route
router.get('/', function (req, res) {
  res.json({
    message: 'welcome to our API!'
  })
});

// Vehicle route
router.route('/vehicles')
  .post(function (req, res) {
    var vehicle = new Vehicle(); // New instance of a vehicle
    vehicle.make = req.body.make;
    vehicle.model = req.body.model;
    vehicle.color = req.body.color;

    vehicle.save(function (err) {
      if (err) {
        res.send(err);
      }
      res.json({
        message: 'Vehicle was successfully manufactured'
      });
    });
  })

  .get(function (req, res) {
    Vehicle.find(function (err, vehicles) {
      if (err) {
        res.send(err);
      }
      res.json(vehicles);
    });
  });

router.route('/vehicle/:vehicleId')
  .get(function (req, res) {
    Vehicle.findById(req.params.vehicleId, function (err, vehicle) {
      if (err) {
        res.send(err);
      }
      res.json(vehicle);
    });
  });

router.route('/vehicle/make/:make')
  .get(function (req, res) {
    Vehicle.find({make: req.params.make}, function (err, vehicle) {
      if (err) {
        res.send(err);
      }
      res.json(vehicle);
    });
  });

router.route('/vehicle/color/:color')
  .get(function (req, res) {
    Vehicle.find({color: req.params.color}, function (err, vehicle) {
      if (err) {
        res.send(err);
      }
      res.json(vehicle);
    });
  });
// Fire up the server
app.listen(port);

console.log('Server listening on port: ', port);
