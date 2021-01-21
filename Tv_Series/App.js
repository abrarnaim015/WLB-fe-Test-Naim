if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

const express= require('express')
const app = express()
const PORT = 3002
const routers = require('./routers')
const cors = require('cors')
const { connect } = require('./config')

connect((err) => {
  if(!err) {
    app.use(cors())
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(routers)
    
    
    app.listen(PORT, () => {
      console.log(`🚀 Mongodb TV Series http://localhost:${PORT}`)
    })
  }
})

module.exports = app