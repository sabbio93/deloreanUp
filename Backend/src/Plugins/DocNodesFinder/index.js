import * as jsonFile from 'plugins/docNodesFinder/jsonFile'
import * as staticCode from 'plugins/docNodesFinder/staticCode'
import path from 'path'
import fs from 'fs'

let jsonConfig = null

/**
 * Get the list of configured docNodes, configurations should be placed on <root>/Backend/config.js as default
 * @param {string} configPath - path of the configs file (name included) (default: <root>/Backend/config.js)
 * @return {Array<DocNode>} - return a list of {@link DocNode} object
 */
function getConfiguredDocNodes (configPath = path.join(__dirname, '..', 'config.json')) {
  if (jsonConfig === null) {
    const rawdata = fs.readFileSync(configPath)
    jsonConfig = JSON.parse(rawdata)
  }

  if (jsonConfig.docNodesMethod) {
    let method = jsonConfig.docNodesMethod
    if (method === 'static') {
      return staticCode.getAllNodes()
    } else if (method === 'json') {
      return jsonFile.getAllNodes(jsonConfig)
    } else if (method === 'consul') {
      throw new Error('Not implemented')
    } else {
      throw new Error('Config method should be one of these options [static, json, consul]')
    }
  } else {
    throw new Error('DocNodesMethod is required in config')
  }
}

export { getConfiguredDocNodes }
