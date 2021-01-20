# Movie & Tv Series Web App

## TypeDerf
```js
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
```

## URL
* Movie
```url
http://localhost:3001
```
* Tv Series
```url
http://localhost:3002
```
* Orchestrator
```url
http://localhost:4000
```

## GraphQL API
```js
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

query MovieId {
  movieId(id:"5fc9104d6983b63b85181915") {
    title
    overview
    poster_path
    popularity
    tags
  }
}

query TvSeriesId {
  serieId(id:"5fcbbdd03497d04f48780cf0") {
    title
    overview
    poster_path
    popularity
    tags
  }
}

query GetAll {
  movies {
    _id
    title
  }
  series {
    _id
    title
  }
}

mutation addMovie {
  addMovie(data: {
   	title: "Tangled",
    overview: "The magically long-haired Rapunzel has spent her entire life in a tower, but now that a runaway thief has stumbled upon her, she is about to discover the world for the first time, and who she really is.",
    poster_path: "https://2.bp.blogspot.com/_Fxf2MsuHlys/THcYAkwKuPI/AAAAAAAAADM/-OryeVzO5NY/s1600/Tangled+Rapunzel.jpg",
    popularity: 77,
    tags: ["#Tangled", "#Tangled"] 
  }){
    title
    overview
    poster_path
    popularity
    tags
  }
}

mutation addMovie2 {
  addMovie(data: {
   	title: "Big Hero 6",
    overview: "A special bond develops between plus-sized inflatable robot Baymax and prodigy Hiro Hamada, who together team up with a group of friends to form a band of high-tech heroes.",
    poster_path: "https://2.bp.blogspot.com/_Fxf2MsuHlys/THcYAkwKuPI/AAAAAAAAADM/-OryeVzO5NY/s1600/Tangled+Rapunzel.jpg",
    popularity: 78,
    tags: ["#BigHero6", "#BigHero6"] 
  }){
    title
    overview
    poster_path
    popularity
    tags
  }
}

mutation addSerie {
  addSerie(data: {
    title: "Money Heist 999",
    overview: "An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history - stealing 2.4 billion euros from the Royal Mint of Spain.",
    poster_path: "https://mcdn.wallpapersafari.com/medium/81/96/EFkwIN.jpeg",
    popularity: 84,
    tags: ["#MoneyHeist", "#MoneyHeist"]
  }){
    title
    overview
    poster_path
    popularity
    tags
  }
}

mutation editTitleMovie {
  editTitleMovie(id: "5fc9104d6983b63b85181915", title: "Moana EDIT", overview: "Moana .", poster_path: "https://www.arthipo.com/image/cache/catalog/poster/movie/759-1554/pfilm1042-moana-26hwy6-film-movie-posters-cinema-kanvas-tablo-canvas-1000x1000.jpg", popularity: 99, tags: ["#MoanaEdit"]) {
    title
    overview
    poster_path
    popularity
    tags
  }
}

mutation editTitleSerie {
  editTitleSerie(id: "5fcb92824805122ae3585b40", title: "edit Money Heist 99") {
    title
    overview
    poster_path
    popularity
    tags
  }
}

mutation deleteMovie {
  deleteMovie(id: "5fcbbdce4c1a5f4f1d135985") {
    msg
  }
}

mutation deleteSerie {
  deleteSerie(id: "5fcbaff93497d04f48780cef") {
    msg
  }
}
```

## Output
* Movies data
```Json
  {
    "movies":
    {
      "__typename":"movie",
      "_id":"5fc9104d6983b63b85181915",
      "title":"Moana",
      "overview":"In Ancient Polynesia, when a terrible curse incurred by the Demigod Maui reaches Moana's island, she answers the Ocean's call to seek out the Demigod to set things right.",
      "poster_path":"https://www.arthipo.com/image/cache/catalog/poster/movie/759-1554/pfilm1042-moana-26hwy6-film-movie-posters-cinema-kanvas-tablo-canvas-1000x1000.jpg",
      "popularity":78,
      "tags":["#Moana"]
    }
  }
```
* Tv Series
```Json
  {
    "series":
    {
      "__typename":"serie",
      "_id":"5fc920dc95c8fb5facbe24d9",
      "title":"Locke & Key test",
      "overview":"After their father is murdered under mysterious circumstances, the three Locke siblings and their mother move into their ancestral home, Keyhouse, which they discover is full of magical keys that may be connected to their father's death.",
      "poster_path":"https://m.media-amazon.com/images/M/MV5BNjZkNzY4M2ItOWY0Ni00Y2ViLWE1NjItOTIyYzZjMzg5M2E1XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg",
      "popularity":74,
      "tags":["#Locke&Key #Horror"]
    }
  }
```
