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
  const nodeId = req.params.nodeId
  if (!nodeId) {
    return baseController.errorResponse(res, 400, 'Bad request. Node ID is required and must be a string')
  }
  const node = DocNodeCollection.getNodeById(getAllNodes(), nodeId)
  if (!node) {
    return baseController.errorResponse(res, 404, 'A node with the specified ID was not found')
  }
  docBridgeContainers.getContainersList(node)
    .then(response => baseController.successResponse(res, response))
    .catch(err => next(err))
}

export {
  getAllNodeList,
  getNodeContainers
}
