const swaggerAutogen = require("swagger-autogen");

const doc = {
  info: {
    title: "Medical Record API",
    description:
      "An API to manage medical appointments, patients",
  },
  host: 'localhost:3000',
  schemes: ['http', 'https']
};

const outputFile = './swagger.json';
const endpointFiles = ['./routes/index.js'];

// THi will generate swagger.json
swaggerAutogen(outputFile, endpointFiles, doc);
