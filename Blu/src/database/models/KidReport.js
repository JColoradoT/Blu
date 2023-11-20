const mongoose = require('mongoose');

const KidReportSchema = new mongoose.Schema({
    minutesPlayedToday: {
        type: mongoose.SchemaTypes.Number,
        default: 0
    },
    daysStreak: {
        type: mongoose.SchemaTypes.Number,
        default: 0
    },
    minutesPerDayGoal: {
        type: mongoose.SchemaTypes.Number,
        default: 5
    },
    todayStreakCompleted: {
        type: mongoose.SchemaTypes.Boolean,
        default: false
    }
});

module.exports = mongoose.model('kidsReports', KidReportSchema);