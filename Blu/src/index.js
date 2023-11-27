// dependencies
const express = require('express');
const { swaggerUI, swaggerSetup } = require('./swagger');
const app = express();
require('dotenv').config();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require('./database/index');

// routes
app.use('/api-doc/', swaggerUI.serve, swaggerSetup);
app.use('/api/authentication/', require('./routes/authentication'));
app.use('/api/kids/', require('./routes/kidProfile'));
app.use('/api/kids/:kid_id/reports/', (req, res, next) => {
    req.kid_id = req.params.kid_id;
    next();
}, require('./routes/reports'));

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
});