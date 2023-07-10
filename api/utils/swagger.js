import swaggerJsdoc from "swagger-jsdoc";
import fs from "fs";

const packageJson = JSON.parse(fs.readFileSync("./package.json"));

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Blog RESTful API Docs",
      version: packageJson.version,
      description: "RESTful API that allows users to register, login and access a protected resource using JWT token."
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["../routes/*.js", "../models/*.js", "./utils/swaggerDocs.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export default function swaggerDocs() {
  return swaggerSpec;
}