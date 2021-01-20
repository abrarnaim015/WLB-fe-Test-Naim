const routers = require('express').Router()
const MoviesController = require('../controller/movies-controller')

routers.get('/movies', MoviesController.getMovie)
routers.post('/movies', MoviesController.postMovie)
routers.get('/movies/:id', MoviesController.getMovieById)
routers.put('/movies/:id', MoviesController.putMovie)
routers.delete('/movies/:id', MoviesController.deleteMovie)

module.exports = routers