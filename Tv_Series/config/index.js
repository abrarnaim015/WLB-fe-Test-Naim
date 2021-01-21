const { MongoClient, ObjectID } = require('mongodb')

const databaseUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017'
const client = new MongoClient(databaseUrl, { useUnifiedTopology: true })

let db;

const connect = cb => {
  client.connect(err =>{
    if(err) {
      console.log('connection failed')
    } else {
      console.log('connected')
      db = client.db('Mongo-TV-Series')
    }
    cb(err)
  })
}

const getDatabase = () => {
  if (db) return db
}
// const TvSeriesCollection = db.collection('tvseries')
// module.exports = { TvSeriesCollection, ObjectID }

module.exports = { getDatabase, connect }
