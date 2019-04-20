import * as staticCode from 'Plugins/DocNodesFinder/staticCode'
import * as baseController from 'controllers/baseController'

const getConfiguredPlugins = () => {
  return [staticCode]
}

const getAllNodeList = (req, res, next) => {
  const nodes = []
  getConfiguredPlugins().map(plugin => plugin.getAllNodes().map(node => nodes.push(node)))
  baseController.successResponse(res, { nodes })
}

export {
  getAllNodeList
}
