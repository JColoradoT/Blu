const mongoose = require('mongoose');

/**
 * @openapi
 * components:
 *  schemas:
 *      GoogleUser:
 *          type: object
 *          properties:
 *              google_id:
 *                  type: string
 *                  unique: true
 *              kids:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/Kid'
 *                  uniqueItems: true
 *          required:
 *              - google_id
 *          example:
 *              google_id: '532623632'
 *              kids: ['BD62E2A09FC9C2F57DF327E1', '18C2C8DDCA7A8030DEE9D549']
 */

const GoogleUserSchema = new mongoose.Schema({
    google_id: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true
    },
    name: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    kids: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Kid'
    }]
});

module.exports = mongoose.model('GoogleUser', GoogleUserSchema);