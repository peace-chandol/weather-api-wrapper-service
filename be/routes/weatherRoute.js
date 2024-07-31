const express = require('express')
const router = express.Router()
const getWeather = require('../controllers/weatherController')

router.route('/weather/:city')
    .get(getWeather)

module.exports = router