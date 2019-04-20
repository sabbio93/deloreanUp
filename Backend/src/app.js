/**
 * Starting point of our project
 *
 */
const createError = require('http-errors')
const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

/**
 * Routes section, load routes:
 *  - containers
 *  - volumes
 */
const docNodesRouter = require('routes/api/docNodes')

app.use('/api/v' + process.env.npm_package_version + '/nodes', docNodesRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res) {
  if (process.env.NODE_ENV === 'development') {
    console.log(err)
  }
  res.setHeader('Content-Type', 'application/json')
  res.status(err.status || 500)
  res.json({
    code: err.status || 500,
    message: process.env.NODE_ENV !== 'development' ? 'Internal server error' : err.message
  })
})

module.exports = app
