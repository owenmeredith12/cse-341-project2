const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info:{
        title: 'Users Api',
        description: 'Users Api'
    },
    host: 'localhost:3001',
    schemas: ['http', 'https']
};

const outputFile = './swagger.json';
const endpointFiles = ['./routes/index.js']

swaggerAutogen(outputFile, endpointFiles, doc);