// const { gql } = require('apollo-server')
// const { MoviesUrl, axios, redis } = require('../config')

// const typeDefs = gql`
//   type movie {
//     _id: ID,
//     title: String
//     overview: String
//     poster_path: String
//     popularity: Int
//     tags: [String]
//   }
//   extend type Query {
//     movies: [movie]
//     movieId(id:ID): movie
//   }
//   input docMovie {
//     title: String!
//     overview: String!
//     poster_path: String!
//     popularity: Int!
//     tags: [String]!
//   }
//   type deleteData {
//     msg: String
//   }
//   extend type Mutation {
//     addMovie(data: docMovie): movie
//     editTitleMovie(id:ID, title: String): movie
//     deleteMovie(id:ID): deleteData
//   }
// `

// const resolvers = {
//   Query: {
//     movies: async () => {
//       try {
//         const RMovies = await redis.get('getMovies')
//         if(RMovies) {
//           return JSON.parse(RMovies)
//         } else {
//           const { data } = await axios({
//             method: "GET",
//             url: MoviesUrl
//           })
//           const setRMovies = await redis.set('getMovies', JSON.stringify(data), 'EX', 10)
//           return data
//         }
//       } catch (err) {
//         console.log(err)
//       }
//     },
//     movieId: async (parent, args, context, info) => {
//       try {
//         const {id} = args
//         const RMovieId = await redis.get('getMovieId')
//         if(RMovieId) {
//           return JSON.parse(RMovieId)
//         } else {
//           const { data } = await axios({
//             method: "GET",
//             url: `${MoviesUrl}/${id}`
//           })
//           const setRmovieId = await redis.set('getMovieId', JSON.stringify(data), 'EX', 10)
//           return data
//         }
//       } catch (err) {
//         console.log(err)
//       }
//     }
//   },
//   Mutation: {
//     addMovie: (parent, args, context, info) => {
//       const { title, overview, poster_path, popularity, tags } = args.data
//       return axios({
//         method: 'POST',
//         url: MoviesUrl,
//         data: {
//           title, 
//           overview, 
//           poster_path, 
//           popularity, 
//           tags
//         }
//       })
//       .then(({ data }) => {
//         redis.del('getMovies')
//         redis.del('getMovieId')
//         return data.ops[0]
//       })
//       .catch(console.log)
//     },
//     editTitleMovie: (parent, args, context, info) => {
//       const { id, title } = args
//       return axios({
//         method: "PUT",
//         url: `${MoviesUrl}/${id}`,
//         data: {
//           title
//         }
//       })
//       .then(({ data }) => {
//         redis.del('getMovies')
//         redis.del('getMovieId')
//         return data.value
//       })
//       .catch(console.log)
//     },
//     deleteMovie: (parent, args, context, info) => {
//       const {id} = args
//       return axios({
//         method: "DELETE",
//         url: `${MoviesUrl}/${id}`,
//       })
//       .then(({ data }) => {
//         redis.del('getMovies')
//         redis.del('getMovieId')
//         return data
//       })
//       .catch(console.log)
//     }
//   }
// }

// module.exports = { typeDefs, resolvers }
