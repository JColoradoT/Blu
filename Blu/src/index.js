// dependencies
const express = require('express');
const app = express();
require('dotenv').config();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require('./database/index');

// routers
app.use('/api/authentication/', require('./routes/authentication'));
app.use('/api/kid', require('./routes/kidProfile'));
app.use('/api/reports/', require('./routes/reports'));

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
});