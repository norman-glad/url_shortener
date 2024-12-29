const express = require('express');
const https = require('https')

const app = express();
const cors = require('cors');
const fs = require('fs')
const { default: mongoose } = require('mongoose');
require('dotenv').config()
const router = require('./router/routes')

// SSL certificate and key
const options = {
    key: fs.readFileSync("ssl/private-key.pem"),
    cert: fs.readFileSync("ssl/certificate.pem"),
};
// Mongo DB Connections
mongoose.connect(process.env.URL, {
}).then(response => {
    console.log('MongoDB Connection Succeeded.')
}).catch(error => {
    console.log('Error in DB connection: ' + error)
});

// Middleware Connections
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/url', router)

// Create HTTPS server
https.createServer(options, app).listen(process.env.PORT, () => {
    console.log('HTTPS server running on port: ' + process.env.PORT);
});