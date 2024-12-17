const express = require('express');
const app = express();
const cors = require('cors');
const { default: mongoose } = require('mongoose');
require('dotenv').config()
const router = require('./router/routes')

// Mongo DB Connections
mongoose.connect(process.env.URL, {
}).then(response=>{
    console.log('MongoDB Connection Succeeded.')
}).catch(error=>{
    console.log('Error in DB connection: ' + error)
});


// Middleware Connections
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/url',router)

// Connection
app.listen(process.env.PORT, ()=>{
    console.log('App running in port: '+process.env.PORT)
})

// `${process.env.URL}`