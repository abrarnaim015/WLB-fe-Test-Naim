const MoviesUrl = 'http://localhost:3001/movies'
const TvSeriesUrl = 'http://localhost:3002/tvseries'
const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()

module.exports = { MoviesUrl, TvSeriesUrl, axios, redis }