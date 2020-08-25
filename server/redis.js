const redis = require('redis')
const { promisify } = require("util");
const { REDIS_CONFIG } = require('../config/db')

const client = redis.createClient(REDIS_CONFIG)

client.on('error', (error) => {
  console.log(error)
})

const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

module.exports = {
  getAsync,
  setAsync
}