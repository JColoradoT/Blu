const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true
    },
    password: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    kids: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Kid'
    }]
});

module.exports = mongoose.model('User', UserSchema);