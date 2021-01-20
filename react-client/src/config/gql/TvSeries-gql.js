import { gql } from '@apollo/client'

export const GET_TVSERIES = gql`
query TvSeries {
  series {
    _id
    title
    overview
    poster_path
    popularity
    tags
  }
}
`
export const DELETE_TV_SERIES = gql`
  mutation deleteSerie($id: ID) {
    deleteSerie(id: $id) {
      msg
    }
  }
`
export const ADD_TV_SERIES = gql`
  mutation addSerie($newTvSeries: docSerie) {
    addSerie(data: $newTvSeries) {
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`
export const GET_COLLECTION_TV_SERIES = gql`
  query getCollections {
    tvseriies {
      _id
      title
      poster_path
    }
  }
`
export const EDIT_TV_SERIES = gql`
  query editTvSeries {
    editTvSeries {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`
export const SAVE_EDIT_TV_SERIES = gql`
  mutation editTitleSerie($id: ID, $title: String!, $overview: String!, $poster_path: String!, $popularity: Int!, $tags: [String]) {
    editTitleSerie(id: $id, title: $title, overview: $overview, poster_path: $poster_path, popularity: $popularity, tags: $tags) {
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`
