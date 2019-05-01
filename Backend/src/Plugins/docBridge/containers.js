import { ContainerApi } from 'deamon_backup_api'

const basePath = '/api/v1.0.0'

/**
 * Method to call inside a node the route `/api/{version}/containers` that return the list of active containers
 * @param {DocNode} node - {@link DocNode} object
 * @returns {AxiosPromise} - promise of the get response, resolved with the list and reject in case of errors
 */
const getContainersList = (node) => {
  return new Promise((resolve, reject) => {
    const containerApi = new ContainerApi()

    containerApi.apiClient.basePath = node.getUrl() + basePath

    containerApi.containersGET((err, data, response) => {
      if (err) {
        reject(err)
      }
      resolve(data)
    })
  })
}

export {
  getContainersList
}
