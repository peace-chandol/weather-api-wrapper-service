const axios = require('axios')
const connectDB = require('../config/dbConn')

const getWeather = async (req, res) => {
    const { city } = req.params
    if (!city) return res.status(400).json({ message: 'City is required' })
    const citySensitive = city.toLowerCase()
        
    const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${citySensitive}/next7days?key=${process.env.WEATHER_API_KEY}&unitGroup=metric&include=days,hours,current&elements=datetime,tempmax,tempmin,temp,conditions,icon,precipprob`

    try {
        const redisDB = await connectDB()

        const cachedWeatherData = await redisDB.get(citySensitive)

        if (cachedWeatherData) {
            res.status(200).json(JSON.parse(cachedWeatherData))
            return
        }

        const response = await axios.get(apiUrl)
        const data = response.data

        const composeData = { 'city': data.resolvedAddress, 'currentTemp': data.currentConditions.temp, 'days': data.days }

        await redisDB.set(data.address.toLowerCase(), JSON.stringify(composeData), { EX: 7200 })

        return res.json(composeData)

    } catch (err) {
        console.error("Error:", err.message)
        res.status(err.response.status)
        res.json({ error: "An error occurred" })
    }
}

module.exports = getWeather