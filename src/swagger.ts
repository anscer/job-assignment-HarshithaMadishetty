// src/swagger.ts
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import app from './app';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Robotics State Management API',
      version: '1.0.0',
    },
  },
  apis: ['./src/routes/*.ts'],
};

const specs = swaggerJsDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

