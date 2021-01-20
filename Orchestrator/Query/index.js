const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  type movie {
    _id: ID,
    title: String
    overview: String
    poster_path: String
    popularity: Int
    tags: [String]
  }
  type Query {
    movies: [movie]
  }
`

const server = new ApolloServer({ typeDefs, resolvers });

module.exports = { server, resolvers, Query }