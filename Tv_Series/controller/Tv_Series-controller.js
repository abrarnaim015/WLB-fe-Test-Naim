const { getDatabase } = require('../config')
const { ObjectID } = require('mongodb')
// const { TvSeriesCollection, ObjectID } = require('../config')


class TvSeriesController {

  static async getTvSeries(req, res, next) {
    try {
      const db = getDatabase()
      const TvSeriesCollection = db.collection('tvseries')
      const series = await TvSeriesCollection.find().toArray()
      res.status(200).json(series)
    } catch (err) {
      console.log(err)
    }
  }

  static async getTvSeriesById(req, res, next) {
    try {
      const id = req.params.id
      const db = getDatabase()
      const TvSeriesCollection = db.collection('tvseries')
      const getData = await TvSeriesCollection.findOne({ _id: ObjectID(id) })
      res.status(200).json(getData)
    } catch (err) {
      console.log(err)
    }
  }

  static async postTvSeries(req, res, next) {
    try {
      const dataBody = req.body
      const db = getDatabase()
      const TvSeriesCollection = db.collection('tvseries')
      const newSeries = await TvSeriesCollection.insertOne(dataBody)
      res.status(201).json(newSeries)
    } catch (err) {
      console.log(err)
    }
  }

  static async putTvSeries(req, res, next) {
    try {
      const id = req.params.id
      const dataBody = req.body
      const db = getDatabase()
      const TvSeriesCollection = db.collection('tvseries')
      const updateSeries = await TvSeriesCollection.findOneAndUpdate({ _id: ObjectID(id) }, { $set: { title: dataBody.title, overview: dataBody.overview, poster_path: dataBody.poster_path, popularity: dataBody.popularity, tags: dataBody.tags } }, { returnOriginal: false })

      res.status(200).json(updateSeries)
    } catch (err) {
      console.log(err)
    }
  }

  static async deleteTvSeries(req, res, next) {
    try {
      const id = req.params.id
      const db = getDatabase()
      const TvSeriesCollection = db.collection('tvseries')
      const delSeries = await TvSeriesCollection.deleteOne({ _id: ObjectID(id) })
      if (delSeries.deletedCount === 1) {
        res.status(200).json({ msg: "Successfully deleted one document." })
      } else {
        res.status(401).json({ msg: "No documents matched the query. Deleted 0 documents." })
      }
    } catch (err) {
      console.log(err)
    }
  }

}

module.exports = TvSeriesController