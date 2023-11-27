const mongoose = require('mongoose');

/**
 * @openapi
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          properties:
 *              email:
 *                  type: string
 *                  format: email
 *              password:
 *                  type: string
 *                  format: password
 *              kids:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/Kid'
 *                  uniqueItems: true
 *          required:
 *              - email
 *              - password
 *          example:
 *              email: 'name@mail.com'
 *              password: '123'
 *              kids: ['BD62E2A09FC9C2F57DF327E1', '18C2C8DDCA7A8030DEE9D549']
 */
const UserSchema = new mongoose.Schema({
    email: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true
    },
    name: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    password: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    kids: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Kid'
    }]
});

module.exports = mongoose.model('User', UserSchema);