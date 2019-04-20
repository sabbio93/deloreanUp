import DocNode from '../../model/DocNode'

const docNodes = [
  new DocNode('127.0.0.1', 5555),
  new DocNode('192.168.0.13', 5555)
]

function getAllNodes () {
  return docNodes
}

export { getAllNodes }
