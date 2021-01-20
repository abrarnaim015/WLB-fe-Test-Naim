const { MoviesCollection, ObjectID } = require('../config')


class MoviesController {

  static async getMovie(req, res, next) {
    try {
      const movies = await MoviesCollection.find().toArray()
      res.status(200).json(movies)
    } catch (err) {
      console.log(err)
    }
  }

  static async getMovieById(req, res, next) {
    try {
      const id = req.params.id
      const getData = await MoviesCollection.findOne({ _id: ObjectID(id) })
      res.status(200).json(getData)
    } catch (err) {
      console.log(err)
    }
  }

  static async postMovie(req, res, next) {
    try {
      const dataBody = req.body
      const newMovie = await MoviesCollection.insertOne(dataBody)
      res.status(201).json(newMovie)
    } catch (err) {
      console.log(err)
    }
  }

  static async putMovie(req, res, next) {
    try {
      const id = req.params.id
      const dataBody = req.body
      const updateMovie = await MoviesCollection.findOneAndUpdate({ _id: ObjectID(id) }, { $set: { title: dataBody.title, overview: dataBody.overview, poster_path: dataBody.poster_path, popularity: dataBody.popularity, tags: dataBody.tags } }, { returnOriginal: false })

      res.status(200).json(updateMovie)
    } catch (err) {
      console.log(err)
    }
  }

  static async deleteMovie(req, res, next) {
    try {
      const id = req.params.id
      const delMovie = await MoviesCollection.deleteOne({ _id: ObjectID(id) })
      if (delMovie.deletedCount === 1) {
        res.status(200).json({ msg: "Successfully deleted one document." })
      } else {
        res.status(401).json({ msg: "No documents matched the query. Deleted 0 documents." })
      }
    } catch (err) {
      console.log(err)
    }
  }

}

module.exports = MoviesController

