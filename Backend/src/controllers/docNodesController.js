import * as baseController from 'controllers/baseController'
import * as staticCode from 'Plugins/DocNodesFinder/staticCode'
import * as DocNodeCollection from 'model/collections/DocNodeCollection'
import * as docBridgeContainers from 'Plugins/docBridge/containers'

const getConfiguredPlugins = () => {
  return [staticCode]
}

const getAllNodes = () => {
  const nodes = []
  getConfiguredPlugins().map(plugin => plugin.getAllNodes().map(node => nodes.push(node)))
  return nodes
}

const getAllNodeList = (req, res, next) => {
  baseController.successResponse(res, { nodes: getAllNodes() })
}

const getNodeContainers = (req, res, next) => {
  const node = getNodeByParams(req, res, next)
  docBridgeContainers.getContainersList(node)
    .then(response => baseController.successResponse(res, response))
    .catch(err => next(err))
}

const getNodeContainerById = (req, res, next) => {
  const node = getNodeByParams(req, res, next)
  const containerId = req.params.containerId
  if (!containerId) {
    return baseController.errorResponse(res, 400, 'Bad request. Container ID is required and must be a string')
  }
  docBridgeContainers.getContainerById(node, containerId)
    .then(response => baseController.successResponse(res, response))
    .catch(err => next(err))
}

const getNodeContainerMounts = (req, res, next) => {
  const node = getNodeByParams(req, res, next)
  const containerId = req.params.containerId
  if (!containerId) {
    return baseController.errorResponse(res, 400, 'Bad request. Container ID is required and must be a string')
  }
  docBridgeContainers.getContainerMounts(node, containerId)
    .then(response => baseController.successResponse(res, response))
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
  const node = DocNodeCollection.getNodeById(getAllNodes(), nodeId)
  if (!node) {
    return baseController.errorResponse(res, 404, 'A node with the specified ID was not found')
  }
  return node
}

export {
  getAllNodeList,
  getNodeContainers,
  getNodeContainerById,
  getNodeContainerMounts
}
