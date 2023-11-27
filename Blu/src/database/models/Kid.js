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
 *              name:
 *                  type: string
 *              age:
 *                  type: integer
 *              kid_report_id:
 *                  $ref: '#/components/schemas/KidReport'
 *          required:
 *              - user_id
 *              - name
 *              - age
 *          example:
 *              user_id: '5123512'
 *              name: 'Gustavo Adolfo'
 *              age: 75
 *              kid_report_id: '748EC96F5883EDCF053F8B03'
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
        type: mongoose.SchemaTypes.String,
        required: true
    },
    age: {
        type: mongoose.SchemaTypes.Number,
        required: true
    },
    kid_report_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'KidReport',
    },
    created_at: {
        type: mongoose.SchemaTypes.Date,
        default: new Date()
    },
});

module.exports = mongoose.model('Kid', KidSchema);