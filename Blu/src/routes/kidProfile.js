const express = require('express');
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
router.get('/', (req, res) => {
    res.status(200).send(JSON.stringify({
        status: 'ok',
        data: [{ name: 'kid1' }, { name: 'kid2' }]
    }));
});

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
router.get('/:kid_id/', (req, res) => {
    res.status(200).send(JSON.stringify({
        status: 'ok',
        data: `This is kid ${req.params.kid_id}`
    }));
});

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
router.post('/', (req, res) => {
    res.status(201).send({
        status: 'ok',
        data: JSON.stringify(req.body)
    });
});

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
router.put('/:kid_id/', (req, res) => {
    res.status(200).send({
        status: 'ok',
        data: JSON.stringify(req.body)
    });
});

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
router.delete(':kid_id/', (req, res) => {
    res.status(200).send({
        status: 'ok',
        data: `Kid ${req.params.id} deleted`
    })
});

module.exports = router;