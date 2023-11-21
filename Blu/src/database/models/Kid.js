const mongoose = require('mongoose');

//TODO: HAY QUE REVISAR COMO ES LA ESTRUCTURA DE UN GoogleId
/**
 * @openapi
 * components:
 *  schemas:
 *      Kid:
 *          type: object
 *          properties:
 *              user_id:
 *                  anyOf:
 *                      -   $ref: '#/components/schemas/User'
 *                      -   $ref: '#/components/schemas/GoogleUser'
 *                  example: '5123512'
 *              name:
 *                  type: string
 *                  example: 'Gustavo Adolfo'
 *              age:
 *                  type: integer
 *                  example: 53
 *              kid_report_id:
 *                  $ref: '#/components/schemas/KidReport'
 *                  example: '748EC96F5883EDCF053F8B03'
 */

const KidSchema = new mongoose.Schema({
    user_id: {
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