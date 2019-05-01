const express = require('express')
const docNodesController = require('controllers/docNodesController')
const router = new express.Router()

/**
 * @route   GET api/<version>/nodes/
 * @desc    Return a list of active nodes
 * @access  Private
 */
router.get('/', docNodesController.getAllNodeList)

/**
 * @route   GET api/<version>/nodes/{nodeId}/containers
 * @desc    Return a list of active containers for the node passed as argument
 * @access  Private
 */
router.get('/:nodeId/containers', docNodesController.getNodeContainers)

/**
 * @route   GET api/<version>/nodes/{nodeId}/containers/{containerId}
 * @desc    Return a container object
 * @access  Private
 */
router.get('/:nodeId/containers/:containerId', docNodesController.getNodeContainerById)

/**
 * @route   GET api/<version>/nodes/{nodeId}/containers/{containerId}/mounts
 * @desc    Return an array of mounts object
 * @access  Private
 */
router.get('/:nodeId/containers/:containerId/mounts', docNodesController.getNodeContainerMounts)

module.exports = router
