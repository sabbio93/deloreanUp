/**
 * @class DocNode class
 */
class DocNode {
  /**
   * Create a Doc Node reference
   * @constructs DocNode
   * @param {string} id - unique identifier of the node
   * @param {string} ip - ip of the node
   * @param {int} port - port of the node
   * @param {string} protocol - protocol to use to communicate with the node, (default value: `http`)
   * @param {string} apiVersion - version of the doc-node api installed in the node
   */
  constructor (id, ip, port, protocol = 'http', apiVersion = '1.0.0') {
    this.id = id.toString()
    this.ip = ip
    this.port = port
    this.protocol = protocol
    this.apiVersion = apiVersion
  }

  /**
   * Method that return the url to communicate with the node
   * @returns {string}
   */
  getUrl () {
    return this.protocol + '://' + this.ip + ':' + this.port
  }
}

export default DocNode
