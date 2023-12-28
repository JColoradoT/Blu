const express = require('express');
const { getKidReport, startSession, deleteSession, finishSession } = require('../controllers/reportsController');
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
router.get('/', getKidReport);

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
router.post('/start-session', startSession);

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
router.delete('/delete-session', deleteSession);

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
router.put('/finish-session', finishSession);

module.exports = router;