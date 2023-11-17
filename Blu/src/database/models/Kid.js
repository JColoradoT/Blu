const mongoose = require('mongoose');

const KidSchema = new mongoose.Schema({
    name: {
        type: mongoose.SchemaTypes.String
    },
    age: {
        type: mongoose.SchemaTypes.Number
    }
});

module.exports = mongoose.model('kids', KidSchema);