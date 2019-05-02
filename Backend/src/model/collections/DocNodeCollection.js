/**
 * Collection file for the {@link DocNode} object, this collection contains methods to operate on a collection (a group)
 * of {@link DocNode} object
 */
import * as staticCode from 'Plugins/DocNodesFinder/staticCode'

/**
 * Method to retrive the configured plugins to find the nodes
 * @return {Array} - return an array of plugin
 */
const getConfiguredPlugins = () => {
  return [staticCode]
}

/**
 * Method to get all the nodes available from the configured plugins
 * @return {Array<Object>} - return an array of {@link DocNode} object
 */
const getAllNodes = () => {
  const nodes = []
  getConfiguredPlugins().map(plugin => plugin.getAllNodes().map(node => nodes.push(node)))
  return nodes
}

/**
 * Method to retrive a single node by its id
 * @param {string} id - id of the node to search
 * @return {*} - return the {@link DocNode} object if the id exist, otherwise null
 */
const getNodeById = (id) => {
  const nodes = getAllNodes()
  const node = nodes.filter(node => node.id === id)
  if (node.length === 0) {
    return null
  } else {
    return node[0]
  }
}

export {
  getConfiguredPlugins,
  getAllNodes,
  getNodeById
}
