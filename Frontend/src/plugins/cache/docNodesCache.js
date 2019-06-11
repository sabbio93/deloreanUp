// @flow

import * as cacheUtility from './utility/cacheUtility'

const DB_NAME = 'DeloreanCache'
const TABLE_NAME = 'nodesOS'
const TABLE_KEY = 'id'

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

const rejectDatabaseOperation = (reject, error, response) => {
  response.data = error
  response.success = false
  reject(response)
}

const resolveDatabaseOperation = (resolve, result, response) => {
  response.data = result
  response.success = true
  resolve(response)
}

/**
 * Function that deletes the records inside Node's Object Storage (delorean frontend cache).
 * @return {Promise<ResponseObject>} - promise resolved with the result of database operation (successfully or not)
 */
export function clearCache (): Promise<ResponseObject> {
  return new Promise((resolve, reject) => {
    let response: ResponseObject = { }

    cacheUtility.getDatabaseConnection(DB_NAME, TABLE_NAME, TABLE_KEY)
      .then(connection => {
        let result = connection.store.clear()
        result.onsuccess = (event) => {
          resolveDatabaseOperation(resolve, event.type, response)
        }
        result.onerror = (event) => (rejectDatabaseOperation(reject, event.type, response))
      }).catch(error => rejectDatabaseOperation(reject, error, response))
  })
}

/**
 * Function that adds a Node element to the NodeOS.
 * @param {string} node - a string representing the node information
 * @return {Promise<ResponseObject>} - promise resolved with the result of database operation (successfully or not)
 */
export function addNode (node: string): Promise<ResponseObject> {
  return new Promise((resolve, reject) => {
    let response: ResponseObject = { }

    cacheUtility.getDatabaseConnection(DB_NAME, TABLE_NAME, TABLE_KEY)
      .then(connection => {
        let result = connection.store.put(node)
        result.onsuccess = (event) => {
          resolveDatabaseOperation(resolve, event.type, response)
        }
        result.onerror = (event) => (rejectDatabaseOperation(reject, event, response))
      }).catch(error => rejectDatabaseOperation(reject, error, response))
  })
}

/**
 * Function that sets a container list inside a specific Node record.
 * @param {string} nodeId - a string with the node's id
 * @param {Array<string>} containers - a list with all containers record inside a specific node
 * @return {Promise<ResponseObject>} - promise resolved with the result of database operation (successfully or not)
 */
export function setContainers (nodeId: string, containers: Array<string>): Promise<ResponseObject> {
  return new Promise((resolve, reject) => {
    let response: ResponseObject = { }

    cacheUtility.getDatabaseConnection(DB_NAME, TABLE_NAME, TABLE_KEY)
      .then(connection => {
        let currentNode = connection.store.get(nodeId)
        currentNode.onsuccess = (event) => {
          let record = event.target.result
          if (!record) resolveDatabaseOperation(resolve, 'Node not present', response)
          else {
            record.containers = containers
            currentNode = connection.store.put(record)
            currentNode.onsuccess = (event) => resolveDatabaseOperation(resolve, event.type, response)
            currentNode.onerror = (event) => rejectDatabaseOperation(reject, event.type, response)
          }
        }
      }).catch(error => rejectDatabaseOperation(reject, error, response))
  })
}

/**
 * Function that returns all the nodes with all information inside the cache.
 * @return {Promise<ResponseObject>} - promise resolved with the @type {ResponseObject} with nodes list if successfully else error message
 */
export function getNodes (): Promise<ResponseObject> {
  return new Promise((resolve, reject) => {
    let response: ResponseObject = { }

    cacheUtility.getDatabaseConnection(DB_NAME, TABLE_NAME, TABLE_KEY)
      .then(connection => {
        let result = connection.store.getAll()
        result.onsuccess = (event) => resolveDatabaseOperation(resolve, event.target.result, response)
        result.onerror = (event) => rejectDatabaseOperation(reject, event.type, response)
      }).catch(error => rejectDatabaseOperation(reject, error, response))
  })
}

/**
 * Function that returns the containers list of a specific node.
 * @param {string} nodeId - a string with the node's id
 * @return {Promise<ResponseObject>} - promise resolved with the @type {ResponseObject} with container list if successfully else error message
 */
export function getNodeContainers (nodeId: string): Promise<ResponseObject> {
  return new Promise((resolve, reject) => {
    let response: ResponseObject = { }

    cacheUtility.getDatabaseConnection(DB_NAME, TABLE_NAME, TABLE_KEY)
      .then(connection => {
        let currentNode = connection.store.get(nodeId)
        currentNode.onsuccess = (event) => resolveDatabaseOperation(resolve, event.target.result.containers, response)
        currentNode.onerror = (event) => rejectDatabaseOperation(reject, event.type, response)
      }).catch(error => rejectDatabaseOperation(reject, error, response))
  })
}

/**
 * Function that returns the informations about a single container inside a specific node.
 * @param {string} nodeId - a string with the node's id
 * @param {string} containerId - a string with the container's id
 * @return {Promise<ResponseObject>} - promise resolved with the container object or with error
 */
export function getNodeContainerById (nodeId: string, containerId: string): Promise<ResponseObject> {
  return new Promise((resolve, reject) => {
    let response: ResponseObject = { }

    getNodeContainers(nodeId)
      .then(result => {
        let container = result.data.filter(cont => cont.Id === containerId)
        resolveDatabaseOperation(resolve, container, response)
      }).catch(error => rejectDatabaseOperation(reject, error, response))
  })
}

/**
 * Function that returns the mounts of a specific container inside a specific node.
 * @param {string} nodeId - a string with the node's id
 * @param {*} containerId - a string with the container's id
 * @return {Promise<ResponseObject>} - promise resolved with the container object or with error
 */
export function getNodeContainerMounts (nodeId: string, containerId: string): Promise<ResponseObject> {
  return new Promise((resolve, reject) => {
    let response: ResponseObject = { }

    getNodeContainerById(nodeId, containerId)
      .then(result => {
        resolveDatabaseOperation(resolve, result.data.shift().Mounts, response)
      }).catch(error => rejectDatabaseOperation(reject, error, response))
  })
}
