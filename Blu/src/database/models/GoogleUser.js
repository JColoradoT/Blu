const mongoose = require('mongoose');

const GoogleUserSchema = new mongoose.Schema({
    googleId: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true
    },
    kids: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'kids'
    }]
});

module.exports = mongoose.model('googleUsers', GoogleUserSchema);