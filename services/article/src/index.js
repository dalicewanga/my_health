require("dotenv").config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

var databaseConnection = require("./database/connection");
const { SERVER_PORT } = process.env;
const articleRoute = require("./routes/articleRoute")

//app.use(express.json());



const StartServer = async() => {
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended:true }));

    app.use('/my_health/article', articleRoute);
    app.all("*", (req, res) => res.send({ msg: "Cette route n'existe pas" }));

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
        console.log('Le serveur Article écoute sur le port '+SERVER_PORT);
    })
    .on('error', (err) => {
        console.log(err);
        process.exit();
    })
}

StartServer();
