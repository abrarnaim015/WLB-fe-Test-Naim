const databaseUrl = 'mongodb://localhost:27017'
const { MongoClient, ObjectID } = require('mongodb')
const client = new MongoClient(databaseUrl, { useUnifiedTopology: true })
client.connect()
const db = client.db('Mongo-TV-Series')
const TvSeriesCollection = db.collection('tvseries')

module.exports = { TvSeriesCollection, ObjectID }