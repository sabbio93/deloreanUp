/**
 * Collection file for the {@link DocNode} object, this collection contains methods to operate on a collection (a group)
 * of {@link DocNode} object
 */
import { getConfiguredDocNodes } from 'plugins/docNodesFinder/index'

/**
 * Method to get all the nodes available from the configured plugins
 * @return {Array<Object>} - return an array of {@link DocNode} object
 */
function getAllNodes () {
  return getConfiguredDocNodes()
}

/**
 * Method to retrive a single node by its id
 * @param {string} id - id of the node to search
 * @return {*} - return the {@link DocNode} object if the id exist, otherwise null
 */
function getNodeById (id) {
  const nodes = getAllNodes()
  const node = nodes.filter(node => {
    if (node.id === id) {
      return node
    }
  })
  if (node.length === 0) {
    return null
  } else {
    return node[0]
  }
}

export {
  getAllNodes,
  getNodeById
}
