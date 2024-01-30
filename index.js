const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const router = require('./router/index')
require('dotenv').config()
const errorMiddleware = require('./app/middlewarws/errorMiddleware')
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swagerDoc = require('./swager.json')
const app = express()

// const options = {
//     definition: {
//         openapi: "3.1.0",
//         servers: [
//             {
//                 url: "http://localhost:4000",
//             },
//         ],
//     },
//     apis: ["./router/index.js"],
// };
// const specs = swaggerJsdoc(options);

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api', router)
app.use(errorMiddleware);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swagerDoc));

const PORT = process.env.PORT || 2000;
const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {})
        app.listen(PORT, () => console.log(`сервер запущен на ${PORT}`))
    } catch (e) {
        console.log(e)
    }

}
start()