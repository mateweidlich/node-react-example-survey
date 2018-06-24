// modules
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

// models
require('./models/User');
require('./models/Survey');
mongoose.connect(keys.mongoURI);

// services
require('./services/passport');

// app
const app = express();

app.use(bodyParser.json());
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());

// routes
require('./routes/auth')(app);
require('./routes/billing')(app);
require('./routes/survey')(app);

// react
if (process.env.NODE_ENV === 'production') {
    // static
    app.use(express.static('client/build'));

    // react index.html
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

// server
const PORT = process.env.PORT || 5000;
app.listen(PORT);
