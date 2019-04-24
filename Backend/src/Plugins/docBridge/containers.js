import axios from 'axios'

/**
 * Method to call inside a node the route `/api/{version}/containers` that return the list of active containers
 * @param {DocNode} node - {@link DocNode} object
 * @returns {AxiosPromise} - promise of the get response, resolved with the list and reject in case of errors
 */
const getContainersList = (node) => {
  const path = node.getUrl() + '/api/v' + node.apiVersion + '/containers'
  return axios.get(path)
}

export {
  getContainersList
}
