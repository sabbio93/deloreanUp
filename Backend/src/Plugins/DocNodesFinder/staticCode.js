import DocNode from 'model/DocNode'

const docNodes = [
  new DocNode('1', '127.0.0.1', 5555),
  new DocNode('2', '192.168.1.128', 5555)
]

/**
 * Get all the doc nodes statically configured
 * @return {Array<DocNode>} - return a list of {@link DocNode} object
 */
function getAllNodes () {
  return docNodes
}

export { getAllNodes }
