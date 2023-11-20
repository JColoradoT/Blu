const mongoose = require('mongoose');

const KidSchema = new mongoose.Schema({
    name: {
        type: mongoose.SchemaTypes.String
    },
    age: {
        type: mongoose.SchemaTypes.Number
    },
    kidReport: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'kidsReports',
    }
});

module.exports = mongoose.model('kids', KidSchema);