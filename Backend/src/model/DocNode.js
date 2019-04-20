class DocNode {
  /**
   * Create a Doc Node reference
   * @param {string} id - unique identifier for the node
   * @param {string} ip - ip of the node
   * @param {int} port - port of the node
   */
  constructor (id, ip, port) {
    this.id = id
    this.ip = ip
    this.port = port
  }
}

export default DocNode
