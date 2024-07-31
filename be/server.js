require('dotenv').config()
const express = require('express')
const app = express()
const connectDB = require('./config/dbConn')
const PORT = process.env.PORT || 3000

connectDB()

app.use('/', require('./routes/weatherRoute')) 

app.listen(PORT, () => () => console.log(`Server running on port ${PORT}`))