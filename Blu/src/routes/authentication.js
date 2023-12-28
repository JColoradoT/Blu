const express = require('express');
const router = express.Router();
const { verifyEmailController, registerController } = require('../controllers/authenticationController');
const passport = require('passport');

function CheckIfAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        res.status(400).send({ status: 'error', data: 'user is already authenticated' });
    }
    else next();
}

function OnAuthenticationSuccess(req, res, next, strategyName) {
    passport.authenticate(strategyName,
        (err, user, info) => {
            if (user) {
                req.logIn(user, (err) => {
                    if (err) { return next(err); }
                    return res.send({ status: info.status, data: info.data });
                });
            }
            else return res.send({ status: info.status, data: info.data });
        })(req, res, next);
}

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
router.post('/register', registerController);

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
router.post('/login', CheckIfAuthenticated, (req, res, next) => OnAuthenticationSuccess(req, res, next, 'local'));
router.delete('/logout', (req, res) => {
    if (!req.isAuthenticated()) res.status(400).send({status: 'error', data: 'there is no currently active session'});

    req.session.destroy();
    res.status(200).send({ status: 'ok', data: 'session succesfully removed' });
});

router.get('/verify-email/:user_id/:unique_string', verifyEmailController);

/**
 * @openapi
 *  /api/authentication/login-google:
 *      get:
 *          description: Redirects the user to authenticate using a google account
 *          tags: [Authentication]
 */
router.get('/google', CheckIfAuthenticated, passport.authenticate('google', { scope: ['profile'] }));

router.get('/google/callback', (req, res, next) => OnAuthenticationSuccess(req, res, next, 'google'));

module.exports = router;