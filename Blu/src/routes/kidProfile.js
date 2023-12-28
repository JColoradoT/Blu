const express = require('express');
const { getAllKids, getOneKid, createNewKid, updateKid, deleteKid } = require('../controllers/kidProfileController');
const avoidGettingOtherKidsInfoMiddleware = require('../utils/avoidGettingOtherKidsInfoMiddleware');
const router = express.Router();

/**
 * @openapi
 *  /api/kids:
 *      get:
 *          description: Retrieve all kids from a user
 *          tags: [Kids]
 *          parameters:
 *          responses:
 *              '200':
 *                  description: A list of kids
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  status:
 *                                      example: 'ok'
 *                                  data:
 *                                      type: array
 *                                      items:
 *                                      $ref: '#/components/schemas/Kid'
 */
router.get('/', getAllKids);

/**
 * @openapi
 *  /api/kids/{kid_id}:
 *      get:
 *          description: Retrieve an individual kid from the user
 *          tags: [Kids]
 *          parameters:
 *          -   in: path
 *              name: kid_id
 *              schema:
 *                  type: string
 *              required: true
 *              style: simple
 *          responses:
 *              '200':
 *                  description: A kid
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  status:
 *                                      type: string
 *                                      example: ok
 *                                  data:
 *                                      type: array
 *                                      items:
 *                                          $ref: '#/components/schemas/Kid'
 */
router.get('/:kid_id/',avoidGettingOtherKidsInfoMiddleware, getOneKid);

/**
 * @openapi
 *  /api/kids:
 *      post:
 *          description: Creates a kid
 *          tags: [Kids]
 *          parameters:
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Kid'
 *          responses:
 *              '201':
 *                  description: Kid succesfully created
 */
router.post('/', createNewKid);

/**
 * @openapi
 *  /api/kids/{kid_id}:
 *      put:
 *          description: Creates a kid
 *          tags: [Kids]
 *          parameters:
 *          -   in: path
 *              name: kid_id
 *              schema:
 *                  type: string
 *              required: true
 *              style: simple
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Kid'
 *          responses:
 *              '200':
 *                  description: Kid succesfully updated
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  status:
 *                                      type: string
 *                                      example: 'ok'
 *                                  data:
 *                                      $ref: '#/components/schemas/Kid'
 */
router.put('/:kid_id/',avoidGettingOtherKidsInfoMiddleware, updateKid);

/**
 * @openapi
 *  /api/kids/{kid_id}:
 *      delete:
 *          description: Deletes a kid
 *          tags: [Kids]
 *          parameters:
 *          -   in: path
 *              name: kid_id
 *              schema:
 *                  type: string
 *              required: true
 *              style: simple
 *          responses:
 *              '200':
 *                  description: Kid succesfully deleted
 */
router.delete('/:kid_id/',avoidGettingOtherKidsInfoMiddleware, deleteKid);

module.exports = router;