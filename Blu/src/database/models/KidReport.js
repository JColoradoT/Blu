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
 *                  example: '18C2C8DDCA7A8030DEE9D549'
 *              minutes_played_today:
 *                  type: integer
 *                  example: 10
 *              days_streak:
 *                  type: integer
 *                  example: 3
 *              minutes_per_day_goal:
 *                  type: integer
 *                  example: 10
 *              today_streak_completed:
 *                  type: boolean
 */

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