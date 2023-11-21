const path = require('path');
const swaggerUI = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerSetup = swaggerUI.setup(swaggerJSDoc({
    definition: {

        openapi: '3.0.0',
        info: {
            title: 'Blu api documentation',
            version: '1.0.0'
        },
        servers: [
            {
                url: 'http://localhost:3000/'
            }
        ],
    },
    apis: [`${path.join(__dirname, './routes/*.js')}`, `${path.join(__dirname, './database/models/*.js')}`]
}));

module.exports = {
    swaggerUI,
    swaggerSetup
}