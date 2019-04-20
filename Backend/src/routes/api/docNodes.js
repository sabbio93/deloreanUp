const express = require('express')
const docNodesController = require('controllers/docNodesController')
const router = new express.Router()

/**
 * @route   GET api/<version>/nodes/list
 * @desc    Return a list of active nodes
 * @access  Private
 */
router.get('/list', docNodesController.getAllNodeList)

/**
 * @route   GET api/<version>/nodes/{nodeId}/containers/list
 * @desc    Return a list of active containers for the node passed as argument
 * @access  Private
 */
router.get('/:nodeId/containers/list', docNodesController.getNodeContainersList)

module.exports = router
