const express = require('express')
// const path = require('path')
const router = new express.Router()

router.get('/', (req, res) => {
  res.sendFile('./index.html')
})

module.exports = router
