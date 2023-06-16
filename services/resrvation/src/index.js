require("dotenv").config();
const express = require('express');
var databaseConnection = require("./database/connection");
const { SERVER_PORT, MONGODB_URI } = process.env;

//app.use(express.json());



const StartServer = async() => {
    const app = express();

    await databaseConnection();

    app.listen(SERVER_PORT, () => {
        console.log('Le serveur Reservation écoute sur le port '+SERVER_PORT);
    })
    .on('error', (err) => {
        console.log(err);
        process.exit();
    })
}

StartServer();