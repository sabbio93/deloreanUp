import { ContainerApi } from 'doc-node-client'

const basePath = '/api/v1.0.0'

/**
 * Method to call inside a node the route `/api/{version}/containers` that return the list of active containers
 * @param {DocNode} node - {@link DocNode} object
 * @returns {Promise} - promise of the get response, resolved with the list and rejected in case of errors
 */
const getContainersList = (node) => {
  return new Promise((resolve, reject) => {
    const containerApi = new ContainerApi()

    containerApi.apiClient.basePath = node.getUrl() + basePath

    containerApi.containersGET((err, data, response) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

/**
 * Method to call inside a node the route `/api/{version}/containers/{id}` that return a container
 * @param {DocNode} node - {@link DocNode} object
 * @param {string} containerId - container id
 * @return {Promise} - promise of the get response, resolved with the container object and rejected in case of errors
 */
const getContainerById = (node, containerId) => {
  return new Promise((resolve, reject) => {
    const containerApi = new ContainerApi()

    containerApi.apiClient.basePath = node.getUrl() + basePath

    containerApi.containerByIdGET(containerId, (err, data, response) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

/**
 * Method to call inside a node the route `/api/{version}/containers/{id}/mounts` that return a container's mounts object
 * @param {DocNode} node - {@link DocNode} object
 * @param {string} containerId - container id
 * @return {Promise} - promise of the get response, resolved with the container object and rejected in case of errors
 */
const getContainerMounts = (node, containerId) => {
  return new Promise((resolve, reject) => {
    const containerApi = new ContainerApi()

    containerApi.apiClient.basePath = node.getUrl() + basePath

    containerApi.containerMountsGET(containerId, (err, data, response) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

export {
  getContainersList,
  getContainerById,
  getContainerMounts
}
