require("dotenv").config();
const express = require('express');
const cors = require('cors');
const proxy = require('express-http-proxy');


const { SERVER_PORT } = process.env;


const app = express();

app.use(cors());
app.use(express.json());


app.use('/utilisateur', proxy('http://localhost:3001'))
app.use('/reservation', proxy('http://localhost:3002'))
app.use('/suivi_sante', proxy('http://localhost:3003'))
app.use('/discussion', proxy('http://localhost:3004'))
app.use('/mail', proxy('http://localhost:3005'))
app.use('/notification', proxy('http://localhost:3006'))
app.use('/article', proxy('http://localhost:3007'))


app.listen(SERVER_PORT, () => {
    console.log('Le serveur Article écoute sur le port '+SERVER_PORT);
});