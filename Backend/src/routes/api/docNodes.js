const express = require('express')
const docNodesController = require('controllers/docNodesController')
const router = new express.Router()

/**
 * @route   GET api/<version>/nodes/list
 * @desc    Return a list of active nodes
 * @access  Private
 */
router.get('/list', docNodesController.getAllNodeList)

module.exports = router
