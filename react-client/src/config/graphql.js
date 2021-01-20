import { ApolloClient, InMemoryCache } from '@apollo/client'
import { GET_COLLECTIONS } from './gql/Movies-gql'
import { GET_COLLECTION_TV_SERIES } from './gql/TvSeries-gql'

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache()
})

client.writeQuery({
  query: GET_COLLECTIONS,
  data: {
    favorites: []
  }
})
client.writeQuery({
  query: GET_COLLECTION_TV_SERIES,
  data: {
    tvseriies: []
  }
})

export default client