const mongoose = require('mongoose');

const KidReportSchema = new mongoose.Schema({
    kid_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Kid'
    },
    minutes_played_today: {
        type: mongoose.SchemaTypes.Number,
        default: 0
    },
    days_streak: {
        type: mongoose.SchemaTypes.Number,
        default: 0
    },
    minutes_per_day_goal: {
        type: mongoose.SchemaTypes.Number,
        default: 5
    },
    today_streak_completed: {
        type: mongoose.SchemaTypes.Boolean,
        default: false
    }
});

module.exports = mongoose.model('KidReport', KidReportSchema);