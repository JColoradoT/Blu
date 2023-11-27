const express = require('express');
const router = express.Router();
const authenticationController = require('../controllers/authenticationController');

/**
 * @openapi
 *  /api/authentication/register:
 *      post:
 *          description: Creates a local user
 *          tags: [Authentication]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/User'
 *          responses:
 *              200:
 *                  description: User succesfully registered
 */
router.post('/register');

/**
 * @openapi
 *  /api/authentication/login:
 *      post:
 *          description: Authenticates the user and creates a session
 *          tags: [Authentication]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/User'
 *          responses:
 *              200:
 *                  description: User succesfully authenticated
 */
router.post('/login', (req, res) => {
    res.status(200).send({
        status: 'ok',
        data: 'welcome back!!'
    });
});

/**
 * @openapi
 *  /api/authentication/login-google:
 *      get:
 *          description: Redirects the user to authenticate using a google account
 *          tags: [Authentication]
 */
router.get('/login-google', (req, res) => {
});

module.exports = router;