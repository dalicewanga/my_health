require("dotenv").config();
const express = require('express');
const cors = require('cors');
var databaseConnection = require("./database/connection");
const { SERVER_PORT, MONGODB_URI } = process.env;
const userRoute = require("./routes/userRoute")
const adminRoute = require("./routes/adminRoute")
const patientRoute = require("./routes/patientRoute")
const professionnelRoute = require("./routes/professionnelRoute")
const bodyParser = require('body-parser');

const StartServer = async() => {
    const app = express();
    app.use(express.json());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended:true }));
    app.use(cors());

    app.use('/my_health/utilisateur', userRoute, adminRoute, patientRoute, professionnelRoute)

    await databaseConnection();

    //error handling
    app.use((err, req, res, next) => {

        err.statusCode = err.statusCode || 500;
        err.message = err.message || "Internal Server Error";
        res.status(err.statusCode).json({
            message:err.message,
        });

    });

    app.listen(SERVER_PORT, () => {
        console.log('Le serveur Utilisateur écoute sur le port '+SERVER_PORT);
    })
    .on('error', (err) => {
        console.log(err);
        process.exit();
    })
}

StartServer();