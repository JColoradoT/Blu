const mongoose = require('mongoose');

/**
 * @openapi
 * components:
 *  schemas:
 *      GoogleUser:
 *          type: object
 *          properties:
 *              googleId:
 *                  type: string
 *                  example: '532623632'
 *              kids:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/Kid'
 *                  uniqueItems: true
 *                  example: ['5123512', '2151532','5325325']
 */

const GoogleUserSchema = new mongoose.Schema({
    google_id: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true
    },
    kids: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Kid'
    }]
});

module.exports = mongoose.model('GoogleUser', GoogleUserSchema);