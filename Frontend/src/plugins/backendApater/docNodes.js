// @flow
import * as remoteApi from './remoteApi/docNodes'
import * as mockApi from './mockApi/docNode'

const docNodesApi = process.env.NODE_ENV === 'production' ? remoteApi : mockApi

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
 * Method to call on the backend the GET route `/api/{version}/nodes` that return the list of doc-nodes
 * @return {Promise<ResponseObject>} - promise resolved with the list of the nodes or error code and message when
 * the response code is included in the `specialErrorStatus` array, otherwise is rejected
 */
function getNodes (): Promise<ResponseObject> {
  return docNodesApi.getNodes()
}

/**
 * Method to call on the backend the GET route `/api/{version}/nodes/{nodeId}/containers` that return the list of
 * active containers in the node
 * @param {string} nodeId - id of the requested node
 * @return {Promise<ResponseObject>} - promise resolved with the list of active containers or with error
 * code and message when the response code is included in the `specialErrorStatus` array, otherwise is rejected
 */
function getNodeContainers (nodeId: string): Promise<ResponseObject> {
  return docNodesApi.getNodeContainers(nodeId)
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
  return docNodesApi.getNodeContainerById(nodeId, containerId)
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
  return docNodesApi.getNodeContainerMounts(nodeId, containerId)
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
  return docNodesApi.postContainerBackup(nodeId, containerId)
}

export {
  getNodes,
  getNodeContainers,
  getNodeContainerById,
  getNodeContainerMounts,
  postContainerBackup
}
