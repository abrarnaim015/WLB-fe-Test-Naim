const routers = require('express').Router()
const TvSeriesController = require('../controller/Tv_Series-controller')

routers.get('/tvseries', TvSeriesController.getTvSeries)
routers.post('/tvseries', TvSeriesController.postTvSeries)
routers.get('/tvseries/:id', TvSeriesController.getTvSeriesById)
routers.put('/tvseries/:id', TvSeriesController.putTvSeries)
routers.delete('/tvseries/:id', TvSeriesController.deleteTvSeries)

module.exports = routers