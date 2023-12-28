const mongoose = require('mongoose');

const GameSessionSchema = new mongoose.Schema({
    kid_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'kid',
        unique: true
    },
    game_name: {
        type: mongoose.SchemaTypes.String,
        enum: ['game1', 'game2', 'game3'],
        required: true
    },
    created_at: {
        type: mongoose.SchemaTypes.Date,
        required: true,
        default: new Date()
    }
});

module.exports = mongoose.model('game_session', GameSessionSchema);