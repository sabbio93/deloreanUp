import * as baseController from 'controllers/baseController'
import * as docNodeCollection from 'model/collections/DocNodeCollection'
import * as docBridgeContainers from 'Plugins/docBridge/containers'

const getAllNodeList = (req, res, next) => {
  baseController.successResponse(res, { nodes: docNodeCollection.getAllNodes() })
}

const getNodeContainers = (req, res, next) => {
  const node = getNodeByParams(req, res, next)
  docBridgeContainers.getContainersList(node)
    .then(response => handleApiResponse(res, response))
    .catch(err => next(err))
}

const getNodeContainerById = (req, res, next) => {
  const node = getNodeByParams(req, res, next)
  const containerId = req.params.containerId
  if (!containerId) {
    return baseController.errorResponse(res, 400, 'Bad request. Container ID is required and must be a string')
  }
  docBridgeContainers.getContainerById(node, containerId)
    .then(response => handleApiResponse(res, response))
    .catch(err => next(err))
}

const getNodeContainerMounts = (req, res, next) => {
  const node = getNodeByParams(req, res, next)
  const containerId = req.params.containerId
  if (!containerId) {
    return baseController.errorResponse(res, 400, 'Bad request. Container ID is required and must be a string')
  }
  docBridgeContainers.getContainerMounts(node, containerId)
    .then(response => handleApiResponse(res, response))
    .catch(err => next(err))
}

/**
 * Method that check if the nodeId param exists in the request and if a node with that ID exist
 * @param {Object} req - the request object
 * @param {Object} res - the response object
 * @param {function} next - the next middleware function
 * @return {Object} - return a {@link DocNode} object otherwise an error response if the ID not exist
 */
const getNodeByParams = (req, res, next) => {
  const nodeId = req.params.nodeId
  if (!nodeId) {
    return baseController.errorResponse(res, 400, 'Bad request. Node ID is required and must be a string')
  }
  const node = docNodeCollection.getNodeById(nodeId)
  if (!node) {
    return baseController.errorResponse(res, 404, 'A node with the specified ID was not found')
  }
  return node
}

/**
 * Method that handle the response received by the docBridge api and send the proper response
 * @param res{Object} res - the response object
 * @param {Object} response - object containing the response from the docBridge api, has 2 properties:
 *  - `success` boolean that is true if there are not errors, otherwise false
 *  - `data` an object containing the response data in case of success, otherwise contain an object with `code` and `message` of the error
 */
const handleApiResponse = (res, response) => {
  if (response.success) {
    return baseController.successResponse(res, response.data)
  } else {
    return baseController.errorResponse(res, response.data.code, response.data.message)
  }
}

export {
  getAllNodeList,
  getNodeContainers,
  getNodeContainerById,
  getNodeContainerMounts
}
