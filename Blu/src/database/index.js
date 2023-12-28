const mongoose = require('mongoose');

const dbUrl = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PWD}@mycluster.jq6glwv.mongodb.net/blu`;

mongoose.connect(dbUrl)
    .then(() => console.log("connected to DB"));

module.exports = dbUrl;