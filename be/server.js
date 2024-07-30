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

app.get("/test", async (req, res) => {
    try {
        const cachedData = await redisConn.get("test")

        if (cachedData) {
            res.json(JSON.parse(cachedData))
            console.log('have cached')
            return
        }

        const data = {
            id: 1,
            name: 'peace'
        }

        console.log('no cached')
        await redisConn.set("test", JSON.stringify(data))
        res.json(data)

    } catch (err) {
        const axios = require('axios')
        console.error("Error:", err)
        res.status(500).json({ error: "An error occurred" })
    }
})

const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Bangkok?key=${process.env.WEATHER_API_KEY}`
app.get('/weather', async (req, res) => {
    try {
        const response = await axios.get(apiUrl)
        const data = response.data
        return res.json({ message: data })
    } catch (err) {
        console.error("Error:", err.message)
        res.status(500).json({ error: "An error occurred" })
    }
})



app.listen(PORT, async (req, res) => {
    await initRedis()
    console.log("http server run at " + PORT)
})