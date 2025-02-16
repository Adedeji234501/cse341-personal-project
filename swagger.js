const swaggerAutogen = require("swagger-autogen");

const doc = {
  info: {
    title: "Medical Record API",
    description:
      "An API to manage medical appointments, patients",
  },
  host: 'cse341-personal-project-l5c5.onrender.com',
  schemes: ['https']
};

const outputFile = './swagger.json';
const routes = ['./routes/index.js'];

// THi will generate swagger.json
swaggerAutogen(outputFile, routes, doc);
