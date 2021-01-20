// const { MoviesUrl, TvSeriesUrl, axios, redis } = require('../config')

// class OrchestratorController {

//   static async getMovies(req, res, next) {
//     try {
//       const RMovies = await redis.get('getMovie')
//       if(RMovies) {
//         res.status(200).json(JSON.parse(RMovies))
//       } else {
//         const { data } = await axios({
//           method: 'GET',
//           url: MoviesUrl
//         })
//         const setRMovies = await redis.set('getMovie', JSON.stringify(data),'EX', 10)
//         res.status(200).json(data)
//       }
//     } catch (err) {
//       console.log(err)
//     }
//   }

//   static async getSeries(req, res, next) {
//     try {
//       const RSeries = await redis.get('getSeries')
//       if(RSeries) {
//         res.status(200).json(JSON.parse(RSeries))
//       } else {
//         const { data } = await axios({
//           method: 'GET',
//           url: TvSeriesUrl
//         })
//         const setRSeries = await redis.set('getSeries', JSON.stringify(data), 'EX', 10)
//         res.status(200).json(data)
//       }
//     } catch (err) {
//       console.log(err)
//     }
//   }

//   static async postMovie(req, res, next) {
//     try {
//       const dataBody = req.body
//       axios({
//         method: 'POST',
//         url: MoviesUrl,
//         data: dataBody
//       })
//       .then(({ data }) => {
//         redis.del('getMovie')
//         res.status(201).json(data)
//       })
//     } catch (err) {
//       console.log(err)
//     }
//   }

//   static async postSeries(req, res, next) {
//     try {
//       const dataBody = req.body
//       axios({
//         method: 'POST',
//         url: TvSeriesUrl,
//         data: dataBody
//       })
//       .then(({ data }) => {
//         redis.del('getSeries')
//         res.status(201).json(data)
//       })
//     } catch (err) {
//       console.log(err)
//     }
//   }

//   static async putMovie(req, res, next) {
//     try {
//       const id = req.params.id
//       const dataBody = req.body
//       axios({
//         method: 'PUT',
//         url: `${MoviesUrl}/${id}`,
//         data: dataBody
//       })
//       .then(({ data }) => {
//         redis.del('getMovie')
//         res.status(200).json(data)
//       })
//     } catch (err) {
//       console.log(err)
//     }
//   }

//   static async putSeries(req, res, next) {
//     try {
//       const id = req.params.id
//       const dataBody = req.body
//       axios({
//         method: 'PUT',
//         url: `${TvSeriesUrl}/${id}`,
//         data: dataBody
//       })
//       .then(({ data }) => {
//         redis.del('getSeries')
//         res.status(200).json(data)
//       })
//     } catch (err) {
//       console.log(err)
//     }
//   }

//   static async deleteMovie(req, res, next) {
//     try {
//       const id = req.params.id
//       axios({
//         method: 'DELETE',
//         url: `${MoviesUrl}/${id}`
//       })
//       .then(({ data }) => {
//         redis.del('getMovie')
//         res.status(200).json(data)
//       })
//     } catch (err) {
//       console.log(err)
//     }
//   }

//   static async deleteSeries(req, res, next) {
//     try {
//       const id = req.params.id
//       axios({
//         method: 'DELETE',
//         url: `${TvSeriesUrl}/${id}`
//       })
//       .then(({ data }) => {
//         redis.del('getSeries')
//         res.status(200).json(data)
//       })
//     } catch (err) {
//       console.log(err)
//     }
//   }

// }

// module.exports = OrchestratorController


// // const { resolvers, Query } = require('./Query')


// // const resolvers = {
// //   Query: {
// //     movies: () => {
// //       return axios({
// //         method: 'GET',
// //         url: 'http://localhost:3001/movies'
// //       })
// //       .then(({ data }) => {
// //         return data
// //       })
// //       .catch(err => console.log(err))
// //     }
// //   }
// // }
