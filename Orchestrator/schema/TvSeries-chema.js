// const { gql, ApolloServer } = require('apollo-server')
// const { TvSeriesUrl, axios, redis } = require('../config')

// const typeDefs = gql`
//   type serie {
//     _id: ID,
//     title: String
//     overview: String
//     poster_path: String
//     popularity: Int
//     tags: [String]
//   }
//   extend type Query {
//     series: [serie]
//     serieId(id:ID): serie
//   }
//   input docSerie {
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
//     addSerie(data: docSerie): serie
//     editTitleSerie(id:ID, title: String): serie
//     deleteSerie(id:ID): deleteData
//   }
// `

// const resolvers = {
//   Query: {
//     series: async () => {
//       try {
//         const RSeries = await redis.get('getSeries')
//         if(RSeries) {
//           return JSON.parse(RSeries)
//         } else {
//           const { data } = await axios({
//             method: "GET",
//             url: TvSeriesUrl
//           })
//           const setRSeries = await redis.set('getSeries', JSON.stringify(data), 'EX', 10)
//           return data
//         }
//       } catch (err) {
//         console.log(err)
//       }
//     },
//     serieId: async (parent, args, context, info) => {
//       try {
//         const {id} = args
//         const RSerieId = await redis.get('getSerieId')
//         if(RSerieId) {
//           return JSON.parse(RSerieId)
//         } else {
//           const { data } = await axios({
//             method: "GET",
//             url: `${TvSeriesUrl}/${id}`
//           })
//           const setRSerie = await redis.set('getSerieId', JSON.stringify(data), 'EX', 10)
//           return data
//         }
//       } catch (err) {
//         console.log(err)
//       }
//     }
//   },
//   Mutation: {
//     addSerie: (parent, args, context, info) => {
//       const { title, overview, poster_path, popularity, tags } = args.data
//       return axios({
//         method: 'POST',
//         url: TvSeriesUrl,
//         data: {
//           title, 
//           overview, 
//           poster_path, 
//           popularity, 
//           tags
//         }
//       })
//       .then(({ data }) => {
//         redis.del('getSeries')
//         redis.del('getSerieId')
//         return data.ops[0]
//       })
//       .catch(console.log)
//     },
//     editTitleSerie: (parent, args, context, info) => {
//       const { id, title } = args
//       return axios({
//         method: "PUT",
//         url: `${TvSeriesUrl}/${id}`,
//         data: {
//           title
//         }
//       })
//       .then(({ data }) => {
//         redis.del('getSerieId')
//         redis.del('getSeries')
//         return data.value
//       })
//       .catch(console.log)
//     },
//     deleteSerie: (parent, args, context, info) => {
//       const {id} = args
//       return axios({
//         method: "DELETE",
//         url: `${TvSeriesUrl}/${id}`,
//       })
//       .then(({ data }) => {
//         redis.del('getSeries')
//         redis.del('getSerieId')
//         return data
//       })
//       .catch(console.log)
//     }
//   }
// }

// const SeriesSchema = new ApolloServer({
//   typeDefs,
//   resolvers
// });

// module.exports = SeriesSchema
