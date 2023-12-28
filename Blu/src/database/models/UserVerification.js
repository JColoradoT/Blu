const mongoose = require('mongoose');

const UserVerificationSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.SchemaTypes.ObjectId,
        refPath: 'user_type',
        required: true,
        unique: true
    },
    user_type: {
        type: mongoose.SchemaTypes.String,
        enum: ['user', 'google_user']
    },
    unique_string: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true
    },
    created_at: {
        type: mongoose.SchemaTypes.Date,
        default: new Date()
    },
    expires_at: {
        type: mongoose.SchemaTypes.Date,
        default: new Date().setHours(new Date().getHours() + 1)
    }
});

module.exports = mongoose.model('user_verification', UserVerificationSchema);