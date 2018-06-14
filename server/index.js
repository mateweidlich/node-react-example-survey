//modules
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');

//models
require('./models/User');
mongoose.connect(keys.mongoURI);

// services
require('./services/passport');

// app
const app = express();

app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey]
	})
);
app.use(passport.initialize());
app.use(passport.session());

//routes
require('./routes/auth')(app);

// server
const PORT = process.env.PORT || 5000;
app.listen(PORT);