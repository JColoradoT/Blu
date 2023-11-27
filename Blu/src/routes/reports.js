const express = require('express');
const router = express.Router();

/**
 * @openapi
 *  /api/{user_id}/kids/{kid_id}/reports:
 *      get:
 *          description: Retrieve the reports of a kid
 *          tags: [Reports]
 *          parameters:
 *          -   in: path
 *              name: user_id
 *              schema:
 *                  type: string
 *              required: true
 *              style: simple
 *          -   in: path
 *              name: kid_id
 *              schema:
 *                  type: string
 *              required: true
 *              style: simple
 *          responses:
 *              '200':
 *                  description: Kid's reports returned succesfully
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  status:
 *                                      type: string
 *                                      example: 'ok'
 *                                  data:
 *                                      $ref: '#/components/schemas/KidReport'
 */
router.get('/', (req, res) => {
    res.status(200).send(JSON.stringify({
        status: 'ok',
        data: {
            minutesPlayedToday: 15,
            daysStreak: 4,
            minutePerDayGoal: 15,
            todayStreakCompleted: false
        }
    }));
});

/**
 * @openapi
 *  /api/kids/{kid_id}/reports/start-session:
 *      post:
 *          description: Starts a game session
 *          tags: [Reports]
 *          parameters:
 *          -   in: path
 *              name: kid_id
 *              schema:
 *                  type: string
 *              required: true
 *              style: simple
 *          responses:
 *              '201':
 *                  description: Game session succesfully created
 */
router.post('/start-session', (req, res) => {
    res.status(201).send({
        status: 'ok',
        data: `Session succesfully started for kid ${req.kid_id}`
    });
});

/**
 * @openapi
 *  /api/kids/{kid_id}/reports/delete-session:
 *      delete:
 *          description: Deletes a game session without generating reports
 *          tags: [Reports]
 *          parameters:
 *          -   in: path
 *              name: kid_id
 *              schema:
 *                  type: string
 *              required: true
 *              style: simple
 *          responses:
 *              '201':
 *                  description: Game session succesfully deleted
 */
router.delete('/delete-session', (req, res) => {
    res.status(200).send({
        status: 'ok',
        data: `Session succesfully deleted for kid ${req.kid_id}`
    });
});

/**
 * @openapi
 *  /api/kids/{kid_id}/reports/finish-session:
 *      put:
 *          description: Deletes a game session and updates a report
 *          tags: [Reports]
 *          parameters:
 *          -   in: path
 *              name: kid_id
 *              schema:
 *                  type: string
 *              required: true
 *              style: simple
 *          responses:
 *              '200':
 *                  description: Report succesfully updated
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  status:
 *                                      type: string
 *                                      example: 'ok'
 *                                  data:
 *                                      $ref: '#/components/schemas/KidReport'
 */
router.put('/finish-session', (req, res) => {
    const playedTime = req.body.playedTime;
    const prevReport = {
        minutesPlayedToday: 2,
        daysStreak: 4,
        minutePerDayGoal: 15,
        todayStreakCompleted: false
    };

    prevReport.minutesPlayedToday += parseInt(playedTime);

    if (prevReport.minutesPlayedToday >= prevReport.minutePerDayGoal && !prevReport.todayStreakCompleted) {
        prevReport.daysStreak++;
        prevReport.todayStreakCompleted = true;
    }

    res.status(200).send({
        status: 'ok',
        data: `Kid ${req.kid_id} updated: ${JSON.stringify(prevReport)}`
    });
});

module.exports = router;