// @flow
import { NodesApi } from 'delorean-up-api'

/**
 * Method to get the current host url used to change (in a hard way) the url used by swagger api to perform the requests
 * @return {string} the host url
 */
function getHostUrl () {
  const hostname = window.location.hostname
  const port = window.location.port
  const protocol = window.location.protocol
  const basePath = '/api/v1.0.0'
  return `${protocol}//${hostname}:${port}${basePath}`
}

/**
 * Standard object containing the response from the api, parameters:
 * - @type {boolean} success - `true` when the response doesn't contain errors otherwise `false`
 * - @type {Object} data - object containing the response either in case of errors or success
 * N.b. If the response return a 500 error it will raise an exception otherwise the error is sent on the response object
 * with `success: false`
 */
type ResponseObject = {
  success: boolean,
  data: Object
}

/**
 * This array contain the error that are handled by the api
 * @type {number[]}
 */
const specialErrorStatus = [
  400,
  404
]

/**
 * Initiate the NodeApi object, assumption server and backend executed on the same host, otherwise it's necessary to
 * manually change the property basePath of the api object
 * @type {NodesApi}
 */
const nodesApi = new NodesApi()

nodesApi.apiClient.basePath = getHostUrl()

/**
 * Method to call on the backend the GET route `/api/{version}/nodes` that return the list of doc-nodes
 * @return {Promise<ResponseObject>} - promise resolved with the list of the nodes or error code and message when
 * the response code is included in the `specialErrorStatus` array, otherwise is rejected
 */
function getNodes (): Promise<ResponseObject> {
  return new Promise<ResponseObject>((resolve, reject) => {
    nodesApi.nodesGET((err, data, response) => {
      handleApiResponse(err, data, response)
        .then(resolve)
        .catch(reject)
    })
  })
}

/**
 * Method to call on the backend the GET route `/api/{version}/nodes/{nodeId}/containers` that return the list of
 * active containers in the node
 * @param {string} nodeId - id of the requested node
 * @return {Promise<ResponseObject>} - promise resolved with the list of active containers or with error
 * code and message when the response code is included in the `specialErrorStatus` array, otherwise is rejected
 */
function getNodeContainers (nodeId: string): Promise<ResponseObject> {
  return new Promise<ResponseObject>((resolve, reject) => {
    nodesApi.nodeContainersGET(nodeId, (err, data, response) => {
      handleApiResponse(err, data, response)
        .then(resolve)
        .catch(reject)
    })
  })
}

/**
 * Method to call on the backend the GET route `/api/{version}/nodes/{nodeId}/containers/{containerId}` that return an
 * active container in the node
 * @param {string} nodeId - id of the requested node
 * @param {string} containerId - id of the requested container
 * @return {Promise<ResponseObject>} - promise resolved with the container object or with error
 * code and message when the response code is included in the `specialErrorStatus` array, otherwise is rejected
 */
function getNodeContainerById (nodeId: string, containerId: string): Promise<ResponseObject> {
  return new Promise<ResponseObject>((resolve, reject) => {
    nodesApi.nodeContainerByIdGET(nodeId, containerId, (err, data, response) => {
      handleApiResponse(err, data, response)
        .then(resolve)
        .catch(reject)
    })
  })
}

/**
 * Method to call on the backend the GET route `/api/{version}/nodes/{nodeId}/containers/{containerId}/mounts` that return the
 * array of Mounts object of the requested container in the requested node
 * @param {string} nodeId - id of the requested node
 * @param {string} containerId - id of the requested container
 * @return {Promise<ResponseObject>} - promise resolved with the array of Mount objects or with error
 * code and message when the response code is included in the `specialErrorStatus` array, otherwise is rejected
 */
function getNodeContainerMounts (nodeId: string, containerId: string): Promise<ResponseObject> {
  return new Promise<ResponseObject>((resolve, reject) => {
    nodesApi.containerMountsGET(nodeId, containerId, (err, data, response) => {
      handleApiResponse(err, data, response)
        .then(resolve)
        .catch(reject)
    })
  })
}

/**
 * Method to call on the backend the POST route `/api/{version}/nodes/{nodeId}/containers/{containerId}/backup` that
 * creates backup of the Mounts of the container requested in the requested node
 * @param {string} nodeId - id of the requested node
 * @param {string} containerId - id of the requested container
 * @return {Promise<ResponseObject>} - promise resolved with the array of Backup object or with error
 * code and message when the response code is included in the `specialErrorStatus` array, otherwise is rejected
 */
function postContainerBackup (nodeId: string, containerId: string): Promise<ResponseObject> {
  return new Promise<ResponseObject>((resolve, reject) => {
    nodesApi.containerBackupPOST(nodeId, containerId, (err, data, response) => {
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
 * @return {Promise<ResponseObject>} - return a promise resolved with a response object, composed by 2 properties:
 *  - `success` boolean that is true if there are not errors, otherwise false
 *  - `data` an object containing the response data in case of success, otherwise contain an object with `code` and `message` of the error
 *  rejected otherwise
 */
function handleApiResponse (err: Object, data: Object, response: Object): Promise<ResponseObject> {
  return new Promise<ResponseObject>((resolve, reject) => {
    const responseObject: ResponseObject = {
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
  getNodes,
  getNodeContainers,
  getNodeContainerById,
  getNodeContainerMounts,
  postContainerBackup
}
