const mongoose = require('mongoose');

/**
 * @openapi
 * components:
 *  schemas:
 *      KidReport:
 *          type: object
 *          properties:
 *              kid_id:
 *                  $ref: '#/components/schemas/Kid'
 *              minutes_played_today:
 *                  type: integer
 *              days_streak:
 *                  type: integer
 *              minutes_per_day_goal:
 *                  type: integer
 *              today_streak_completed:
 *                  type: boolean
 *          required:
 *              - kid_id
 *          example:
 *              kid_id: '18C2C8DDCA7A8030DEE9D549'
 *              minutes_played_today: 10
 *              days_streak: 3
 *              minutes_per_day_goal: 10
 *              today_streak_completed: true
 */

const KidReportSchema = new mongoose.Schema({
    kid_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'kid'
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
    },
    created_at: {
        type: mongoose.SchemaTypes.Date,
        default: new Date()
    },
});

module.exports = mongoose.model('kid_report', KidReportSchema);