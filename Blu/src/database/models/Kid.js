const mongoose = require('mongoose');

/**
 * @openapi
 * components:
 *  schemas:
 *      Kid:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *                  example: 'Gustavo Adolfo'
 *              age:
 *                  type: integer
 *                  example: 53
 *              kids:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/Kid'
 *                  uniqueItems: true
 *                  example: ['5123512', '2151532','5325325']
 */

const KidSchema = new mongoose.Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        refPath: 'user_type'
    },
    user_type: {
        type: mongoose.SchemaTypes.String,
        enum: ['User', 'GoogleUser']
    },
    name: {
        type: mongoose.SchemaTypes.String
    },
    age: {
        type: mongoose.SchemaTypes.Number
    },
    kid_report_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'KidReport',
    }
});

module.exports = mongoose.model('Kid', KidSchema);