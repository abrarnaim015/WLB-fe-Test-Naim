import { gql } from '@apollo/client'

export const GET_MOVIE = gql`
  query Movies {
    movies {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`
export const DELETE_MOVIE = gql`
  mutation deleteMovie($id: ID) {
    deleteMovie(id: $id) {
      msg
    }
  }
`
export const ADD_MOVIE = gql`
  mutation addMovie($newMovie: docMovie) {
    addMovie(data: $newMovie) {
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`
export const GET_COLLECTIONS = gql`
  query getCollections {
    favorites {
      _id
      title
      poster_path
    }
  }
`
export const EDIT_MOVIE = gql`
  query editMovie {
    editMovie {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`
export const SAVE_EDIT_MOVIE = gql`
  mutation editTitleMovie($id: ID, $title: String!, $overview: String!, $poster_path: String!, $popularity: Int!, $tags: [String]) {
    editTitleMovie(id: $id, title: $title, overview: $overview, poster_path: $poster_path, popularity: $popularity, tags: $tags) {
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`
