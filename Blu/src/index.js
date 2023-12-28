// dependencies
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');
const { swaggerUI, swaggerSetup } = require('./swagger');
const avoidGettingOtherKidsInfoMiddleware = require('./utils/avoidGettingOtherKidsInfoMiddleware')
const app = express();
require('dotenv').config();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const dbUrl = require('./database/index');

// passport
require('./strategies/local');
require('./strategies/google');
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    rolling: true,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: dbUrl
    }),
    cookie: {
        // seven days
        maxAge: 3600 * 24 * 7 * 1000
    }
}));

app.use(passport.initialize());
app.use(passport.session());

// routes
app.use('/api-doc/', swaggerUI.serve, swaggerSetup);
app.use('/api/authentication/', require('./routes/authentication'));

app.use((req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    }
    else res.sendStatus(401);
});

app.use('/api/kids/' , require('./routes/kidProfile'));
app.use('/api/kids/:kid_id/reports/', avoidGettingOtherKidsInfoMiddleware, (req, res, next) => {
    req.kid_id = req.params.kid_id;
    next();
}, require('./routes/reports'));

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
});

