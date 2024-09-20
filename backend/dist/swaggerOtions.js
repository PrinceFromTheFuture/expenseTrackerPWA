// swaggerOptions.ts
import swaggerJsDoc from "swagger-jsdoc";
const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Expense Tracker API",
            version: "1.0.0",
            description: "API documentation for Expense Tracker PWA",
        },
        servers: [
            {
                url: "http://localhost:3000", // Adjust based on your environment
            },
        ],
    },
    apis: ["./routes/*.js"], // Path to the API docs (adjust as necessary)
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
export default swaggerDocs;
