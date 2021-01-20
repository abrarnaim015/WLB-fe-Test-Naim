const databaseUrl = 'mongodb://localhost:27017'
const { MongoClient, ObjectID } = require('mongodb')
const client = new MongoClient(databaseUrl, { useUnifiedTopology: true })
client.connect()
const db = client.db('Mongo-Movies')
const MoviesCollection = db.collection('movies')

module.exports = { MoviesCollection, ObjectID }