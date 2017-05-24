const express = require('express'),
	app = express(),
	PORT = 3010,
	methodOverride = require('method-override'),
	bodyParser = require('body-parser'),
	logger = require('morgan'),
	request = require('request'),
	Promise = require('bluebird'),
	mongoose = require('mongoose'),
	devUri = "mongodb://localhost/reactJS",
	db = mongoose.connection;
mongoose.Promise = Promise;


app.use(logger("dev"));
app.use(bodyParser.urlencoded({	extended: false }));

app.use(express.static(process.cwd() || __dirname + '/public'));
app.use(methodOverride('_method'));

if (process.env.MONGODNB_URI) {
	mongoose.connect(process.env.MONGODNB_URI);
} else {
	mongoose.connect(devUri);
};


db.on("error", function(error) {
	console.log("Mongoose Error: ", error);
});

db.once("open", function(){
	console.log("Mongoose connection successful.");
});

// ROUTES
// ===========================================================================
var routes = require('./app/config/routes.js');
app.use('/', routes);

// Starts the server to begin listening
// ===========================================================================
app.listen(process.env.PORT || PORT, function () {
	console.log('App listening on PORT ' + PORT);
});