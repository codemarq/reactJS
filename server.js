// ==========================================================================
// package dependencies
// ==========================================================================
var express = require('express');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var request = require('request');
// mongoose mpromise is deprecated, using bluebird promises
var Promise = require('bluebird');
mongoose.Promise = Promise;

// Sets up the Express App
// ==========================================================================
var app = express();
var PORT = 3010;

// Use morgan for logging and body-parser
app.use(logger("dev"));
app.use(bodyParser.urlencoded({	extended: false }));

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() || __dirname + '/public'));

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

// ===========================================================================
// MONGOOSE
// ===========================================================================
// config mongoDB with mongoose
var devUri = "mongodb://localhost/reactJS";

if (process.env.MONGODNB_URI) {
	mongoose.connect(process.env.MONGODNB_URI);
} else {
	mongoose.connect(devUri);
};
var db = mongoose.connection;

// log mongoose errors
db.on("error", function(error) {
	console.log("Mongoose Error: ", error);
});
// log successful connection
db.once("open", function(){
	console.log("Mongoose connection successful.");
});

// ROUTES
// ===========================================================================
// var routes = require('./controllers/controller.js');
// app.use('/', routes);

// Starts the server to begin listening
// ===========================================================================
app.listen(process.env.PORT || PORT, function () {
	console.log('App listening on PORT ' + PORT);
});