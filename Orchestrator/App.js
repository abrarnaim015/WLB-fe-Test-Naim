const { ApolloServer, gql } = require('apollo-server');
const { MoviesUrl, TvSeriesUrl, axios, redis } = require('./config')

const typeDefs = gql`
  type movie {
    _id: ID,
    title: String
    overview: String
    poster_path: String
    popularity: Int
    tags: [String]
  }
  type serie {
    _id: ID,
    title: String
    overview: String
    poster_path: String
    popularity: Int
    tags: [String]
  }
  type Query {
    movies: [movie]
    series: [serie]
    movieId(id:ID): movie
    serieId(id:ID): serie
  }
  input docMovie {
    title: String!
    overview: String!
    poster_path: String!
    popularity: Int!
    tags: [String]!
  }
  input docSerie {
    title: String!
    overview: String!
    poster_path: String!
    popularity: Int!
    tags: [String]!
  }
  type deleteData {
    msg: String
  }
  type Mutation {
    addMovie(data: docMovie): movie
    addSerie(data: docSerie): serie
    editTitleMovie(id:ID, title: String!, overview: String!, poster_path: String!, popularity: Int!, tags: [String]): movie
    editTitleSerie(id:ID, title: String!, overview: String!, poster_path: String!, popularity: Int!, tags: [String]): serie
    deleteMovie(id:ID): deleteData
    deleteSerie(id:ID): deleteData
  }
`

const resolvers = {
  Query: {
    movies: async () => {
      try {
        const RMovies = await redis.get('getMovies')
        if(RMovies) {
          return JSON.parse(RMovies)
        } else {
          const { data } = await axios({
            method: "GET",
            url: MoviesUrl
          })
          const setRMovies = await redis.set('getMovies', JSON.stringify(data), 'EX', 60)
          return data
        }
      } catch (err) {
        console.log(err)
      }
    },
    series: async () => {
      try {
        const RSeries = await redis.get('getSeries')
        if(RSeries) {
          return JSON.parse(RSeries)
        } else {
          const { data } = await axios({
            method: "GET",
            url: TvSeriesUrl
          })
          const setRSeries = await redis.set('getSeries', JSON.stringify(data), 'EX', 60)
          return data
        }
      } catch (err) {
        console.log(err)
      }
    },
    movieId: async (parent, args, context, info) => {
      try {
        const {id} = args
        const RMovieId = await redis.get('getMovieId')
        if(RMovieId) {
          return JSON.parse(RMovieId)
        } else {
          const { data } = await axios({
            method: "GET",
            url: `${MoviesUrl}/${id}`
          })
          const setRmovieId = await redis.set('getMovieId', JSON.stringify(data), 'EX', 60)
          return data
        }
      } catch (err) {
        console.log(err)
      }
    },
    serieId: async (parent, args, context, info) => {
      try {
        const {id} = args
        const RSerieId = await redis.get('getSerieId')
        if(RSerieId) {
          return JSON.parse(RSerieId)
        } else {
          const { data } = await axios({
            method: "GET",
            url: `${TvSeriesUrl}/${id}`
          })
          const setRSerie = await redis.set('getSerieId', JSON.stringify(data), 'EX', 60)
          return data
        }
      } catch (err) {
        console.log(err)
      }
    }
  },
  Mutation: {
    addMovie: (parent, args, context, info) => {
      const { title, overview, poster_path, popularity, tags } = args.data
      return axios({
        method: 'POST',
        url: MoviesUrl,
        data: {
          title, 
          overview, 
          poster_path, 
          popularity, 
          tags
        }
      })
      .then(({ data }) => {
        redis.del('getMovies')
        redis.del('getMovieId')
        return data.ops[0]
      })
      .catch(console.log)
    },
    addSerie: (parent, args, context, info) => {
      const { title, overview, poster_path, popularity, tags } = args.data
      return axios({
        method: 'POST',
        url: TvSeriesUrl,
        data: {
          title, 
          overview, 
          poster_path, 
          popularity, 
          tags
        }
      })
      .then(({ data }) => {
        redis.del('getSeries')
        redis.del('getSerieId')
        return data.ops[0]
      })
      .catch(console.log)
    },
    editTitleMovie: (parent, args, context, info) => {
      const { id, title, overview, poster_path, popularity, tags } = args
      return axios({
        method: "PUT",
        url: `${MoviesUrl}/${id}`,
        data: {
          title,
          overview, 
          poster_path, 
          popularity, 
          tags
        }
      })
      .then(({ data }) => {
        redis.del('getMovies')
        redis.del('getMovieId')
        return data.value
      })
      .catch(console.log)
    },
    editTitleSerie: (parent, args, context, info) => {
      const { id, title, overview, poster_path, popularity, tags } = args
      return axios({
        method: "PUT",
        url: `${TvSeriesUrl}/${id}`,
        data: {
          title,
          overview, 
          poster_path, 
          popularity, 
          tags
        }
      })
      .then(({ data }) => {
        redis.del('getSerieId')
        redis.del('getSeries')
        return data.value
      })
      .catch(console.log)
    },
    deleteMovie: (parent, args, context, info) => {
      const {id} = args
      return axios({
        method: "DELETE",
        url: `${MoviesUrl}/${id}`,
      })
      .then(({ data }) => {
        redis.del('getMovies')
        redis.del('getMovieId')
        return data
      })
      .catch(console.log)
    },
    deleteSerie: (parent, args, context, info) => {
      const {id} = args
      return axios({
        method: "DELETE",
        url: `${TvSeriesUrl}/${id}`,
      })
      .then(({ data }) => {
        redis.del('getSeries')
        redis.del('getSerieId')
        return data
      })
      .catch(console.log)
    }
  }
}

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
})


/** ======== nots Schema ========
const { ApolloServer, gql, makeExecutableSchema } = require('apollo-server')
const MovieSchema = require('./schema/Movies-schema')
const TvSeriesSchema = require('./schema/TvSeries-chema')

const typeDefs = gql`
  type Query
  type Mutation
`

const schema = makeExecutableSchema({
  typeDefs: [
    typeDefs,
    MovieSchema.typeDefs,
    TvSeriesSchema.typeDefs
  ],
  resolvers: [
    MovieSchema.typeDefs,
    TvSeriesSchema.typeDefs
  ]
})

const server = new ApolloServer({
  schema
})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
})
 */


/**===================== notes ================
const express= require('express')
const app = express()
const PORT = 3000
const routers = require('./routers')
const axios = require('axios')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(routers)




app.listen(PORT, () => {
  console.log(`>>> Mongodb Orchestrator http://localhost:${PORT}`)
})

module.exports = app 
 */

