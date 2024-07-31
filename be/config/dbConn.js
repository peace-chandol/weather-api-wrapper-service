const redis = require('redis')

const connectDB = async () => {
    const redisDB = redis.createClient()
    redisDB.on('error', (err) => console.log("Redis Client Error", err))
    await redisDB.connect()
    return redisDB
}

module.exports = connectDB