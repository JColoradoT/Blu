const mongoose = require('mongoose');

const GoogleUserSchema = new mongoose.Schema({
    googleId: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('googleUsers', GoogleUserSchema);