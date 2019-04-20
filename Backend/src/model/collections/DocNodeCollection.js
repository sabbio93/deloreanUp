
const getNodeById = (nodes, id) => {
  const node = nodes.filter(node => node.id === id)
  if (node.length === 0) {
    return null
  } else {
    return node[0]
  }
}

export {
  getNodeById
}
