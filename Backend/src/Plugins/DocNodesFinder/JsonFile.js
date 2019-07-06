import DocNode from 'model/DocNode'

/**
 * Get all nodes from the json configured
 * @param {object} jsonConfig - json object of the config files
 * @return {Array<DocNode>} - return a list of {@link DocNode} object
 * @throws Error - Json config should have docNodesList property
 */
function getAllNodes (jsonConfig) {
  if (jsonConfig.docNodesList) {
    return jsonConfig.docNodesList.map(entry => new DocNode(entry.id, entry.ip, entry.port))
  } else {
    throw new Error('Json config should have docNodesList property')
  }
}

export { getAllNodes }
