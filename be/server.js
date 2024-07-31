require('dotenv').config()
const express = require('express')
const app = express()
const redis = require('redis')
const axios = require('axios')
const PORT = process.env.PORT || 3000

let redisConn = null

const initRedis = async () => {
    redisConn = redis.createClient()
    redisConn.on('error', (err) => console.log("Redis Client Error", err))
    await redisConn.connect()
}

app.get('/weather/:city', async (req, res) => {
    const { city } = req.params
    if (!city) return res.status(400).json({ message: 'City is required' })
    const citySensitive = city.toLowerCase()
        
    const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${citySensitive}/next7days?key=${process.env.WEATHER_API_KEY}&unitGroup=metric&include=days,hours,current&elements=datetime,tempmax,tempmin,temp,conditions,icon,precipprob`

    try {
        const cachedWeatherData = await redisConn.get(citySensitive)

        if (cachedWeatherData) {
            res.status(200).json(JSON.parse(cachedWeatherData))
            return
        }

        const response = await axios.get(apiUrl)
        const data = response.data

        const city = data.address.toLowerCase()
        const currentConditions = {
            'temp': data.currentConditions.temp,
            'humidity': data.currentConditions.humidity
        }

        const composeData = { currentConditions, 'days': data.days }

        await redisConn.set(city, JSON.stringify(composeData), { EX: 7200 })

        return res.json(composeData)

    } catch (err) {
        console.error("Error:", err.message)
        res.status(500).json({ error: "An error occurred" })
    }
})

app.listen(PORT, async (req, res) => {
    await initRedis()
    console.log("http server run at " + PORT)
})