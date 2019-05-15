import { ContainerApi } from 'doc-node-api'

/**
 * This is necessary because when we update (in hard coded way) the basepath of the client api we need to append also this part to the basepathUrl
 * @type {string}
 */
const basePath = '/api/v1.0.0'

/**
 * This array contain the error that are handled by the api
 * @type {number[]}
 */
const specialErrorStatus = [
  400,
  404
]

/**
 * Method to call inside a node the GET route `/api/{version}/containers` that return the list of active containers
 * @param {DocNode} node - {@link DocNode} object
 * @returns {Promise} - promise of the get response, resolved with the list and rejected in case of errors
 */
function getContainersList (node) {
  return new Promise((resolve, reject) => {
    const containerApi = new ContainerApi()

    containerApi.apiClient.basePath = node.getUrl() + basePath

    containerApi.containersGET((err, data, response) => {
      handleApiResponse(err, data, response)
        .then(resolve)
        .catch(reject)
    })
  })
}

/**
 * Method to call inside a node the GET route `/api/{version}/containers/{id}` that return a container
 * @param {DocNode} node - {@link DocNode} object
 * @param {string} containerId - container id
 * @return {Promise} - promise of the get response, resolved with the container object and rejected in case of errors
 */
function getContainerById (node, containerId) {
  return new Promise((resolve, reject) => {
    const containerApi = new ContainerApi()

    containerApi.apiClient.basePath = node.getUrl() + basePath

    containerApi.containerByIdGET(containerId, (err, data, response) => {
      handleApiResponse(err, data, response)
        .then(resolve)
        .catch(reject)
    })
  })
}

/**
 * Method to call inside a node the GET route `/api/{version}/containers/{id}/mounts` that return a container's mounts object
 * @param {DocNode} node - {@link DocNode} object
 * @param {string} containerId - container id
 * @return {Promise} - promise of the get response, resolved with the container object and rejected in case of errors
 */
function getContainerMounts (node, containerId) {
  return new Promise((resolve, reject) => {
    const containerApi = new ContainerApi()

    containerApi.apiClient.basePath = node.getUrl() + basePath

    containerApi.containerMountsGET(containerId, (err, data, response) => {
      handleApiResponse(err, data, response)
        .then(resolve)
        .catch(reject)
    })
  })
}

/**
 * Method to call inside a node the POST route `/api/{version}/containers/{id}/backup` that return an array of backup objects
 * (for additional reference see doc-node documentation)
 * @param {DocNode} node - {@link DocNode} object
 * @param {string} containerId - container id
 * @return {Promise} - promise of the post response, resolved with the array of backup objects and rejected in case of errors
 */
function postContainerBackup (node, containerId) {
  return new Promise((resolve, reject) => {
    const containerApi = new ContainerApi()

    containerApi.apiClient.basePath = node.getUrl() + basePath

    containerApi.containerBackupPOST(containerId, (err, data, response) => {
      handleApiResponse(err, data, response)
        .then(resolve)
        .catch(reject)
    })
  })
}

/**
 * Method that handle the response received by the doc-node-client, that is resolved when there is a success and also when
 * the response is an error with code included in the `specialErrorStatus` array, otherwise is rejected
 * @param {Object} err - error object of the response
 * @param {Object} data - response data
 * @param {Object} response - response of the request
 * @return {Promise<Object>} - return a promise resolved with a response object, composed by 2 properties:
 *  - `success` boolean that is true if there are not errors, otherwise false
 *  - `data` an object containing the response data in case of success, otherwise contain an object with `code` and `message` of the error
 *  rejected otherwise
 */
function handleApiResponse (err, data, response) {
  return new Promise((resolve, reject) => {
    const responseObject = {
      success: true,
      data: null
    }
    if (err) {
      const status = err.status
      // If the error status if one of the special error resolve the response with success false and the error, otherwise reject the promise
      if (specialErrorStatus.includes(status)) {
        responseObject.success = false
        responseObject.data = response.body
        resolve(responseObject)
      } else {
        reject(err)
      }
    } else {
      // If there are not errors resolve the response with success true and the response data
      responseObject.success = true
      responseObject.data = response.body
      resolve(responseObject)
    }
  })
}

export {
  getContainersList,
  getContainerById,
  getContainerMounts,
  postContainerBackup
}
