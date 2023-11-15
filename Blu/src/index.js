const express = require('express');
require('dotenv').config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/authentication/', require('./routes/authentication'));
app.use('/api/kid', require('./routes/kidProfile'));
app.use('/api/reports/', require('./routes/reports'));

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
});