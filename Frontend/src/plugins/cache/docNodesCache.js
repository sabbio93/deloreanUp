// @flow
// alternative for all API: to return connection.tx.complete (is a promise) instead our standard promise

const IDB = window.indexedDB
const DB_NAME = 'DeloreanStorage'
const STORE_NAME = 'nodeOS'
const OS_KEY = 'id'
const VERSION = 1

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

type IndexedDatabaseConnection = {
  result: Object,
  onsuccess: Object,
  onerror: Object
}

/**
 * Object containing the IndexedDB's connection informations
 * - @type {Object} result - result of the attempt to connect
 * - @type {Object} tx - transaction object containing all the operations to do in this openend connection, if an operation inside a transactions fail the changes are deleted
 * - @type {Object} store - bucket (object store) containing records, can be compared to a table in relational databases
 */
type IndexedCustomDatabaseConnection = {
  result: Object,
  tx: Object,
  store: Object
}

const openDatabase = (): IndexedDatabaseConnection => {
  if (!('indexedDB' in window)) {
    alert('IndexedDB not supported')
    throw new Error('IndexedDB not supported')
  }

  let dbRequest = IDB.open(DB_NAME, VERSION)
  dbRequest.onupgradeneeded = (event) => {
    let db = event.target.result
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      db.createObjectStore(STORE_NAME, { keyPath: OS_KEY })
    }
  }

  return dbRequest
}

const getDatabaseConnection = (indexedConnection): IndexedCustomDatabaseConnection => {
  let connection: IndexedCustomDatabaseConnection = {}

  connection.result = indexedConnection.result
  connection.tx = connection.result.transaction(STORE_NAME, 'readwrite')
  connection.store = connection.tx.objectStore(STORE_NAME)

  return connection
}

/**
 * Function that deletes the IndexedDB with all objects stores. It is reversible because the database is recreated when a new connection is opened.
 * @return {Promise<ResponseObject>} - promise resolved with the container object or with error
 */
export function deleteCache (): Promise<ResponseObject> {
  let response: ResponseObject = {}

  return new Promise((resolve, reject) => {
    let dbRequest = IDB.deleteDatabase(DB_NAME)
    dbRequest.onsuccess = (event) => {
      response.data = event.type
      response.success = true
      resolve(response)
    }
    dbRequest.onerror = (event) => {
      response.data = event.type
      response.success = false
      reject(response)
    }
  })
}

/**
 * Function that deletes the records inside Node's Object Storage (delorean frontend cache).
 * @return {Promise<ResponseObject>} - promise resolved with the container object or with error
 */
export function clearCache (): Promise<ResponseObject> {
  return new Promise((resolve, reject) => {
    let db = openDatabase()
    let response: ResponseObject = {}

    db.onsuccess = () => {
      let connection = getDatabaseConnection(db)
      let result = connection.store.clear()
      result.onsuccess = (event) => {
        response.data = event.type
        response.success = true
        resolve(response)
      }
      result.onerror = (event) => {
        response.data = event.type
        response.success = false
        reject(response)
      }
    }
  })
}

/**
 * Function that adds a Node element to the NodeOS.
 * @param {string} node - a string representing the node information
 * @return {Promise<ResponseObject>} - promise resolved with the container object or with error
 */
export function addNode (node: string): Promise<ResponseObject> {
  return new Promise((resolve, reject) => {
    let db = openDatabase()
    let response: ResponseObject = {}

    db.onsuccess = () => {
      let connection = getDatabaseConnection(db)
      let result = connection.store.put(node)
      result.onsuccess = (event) => {
        response.data = event.type
        response.success = true
        resolve(response)
      }
      result.onerror = (event) => {
        response.data = event.type
        response.success = false
        reject(response)
      }
    }
  })
}

/**
 * Function that sets a container list inside a specific Node record.
 * @param {string} nodeId - a string with the node's id
 * @param {Array<string>} containers - a list with all containers record inside a specific node
 * @return {Promise<ResponseObject>} - promise resolved with the container object or with error
 */
export function addContainers (nodeId: string, containers: Array<string>): Promise<ResponseObject> {
  return new Promise((resolve, reject) => {
    let db = openDatabase()

    db.onsuccess = () => {
      let connection = getDatabaseConnection(db)
      let currentNode = connection.store.get(nodeId)
      currentNode.onsuccess = (event) => {
        let record = event.target.result
        record.containers = containers
        currentNode = connection.store.put(record)
        currentNode.onsuccess = (event) => resolve(event.type)
        currentNode.onerror = (event) => reject(event.type)
      }
    }
  })
}

/**
 * Function that returns all the nodes with all information inside the cache.
 * @return {Promise<ResponseObject>} - promise resolved with the container object or with error
 */
export function getNodes (): Promise<ResponseObject> {
  return new Promise((resolve, reject) => {
    let db = openDatabase()
    let response: ResponseObject = {}

    db.onsuccess = () => {
      let connection = getDatabaseConnection(db)
      let result = connection.store.getAll()
      result.onsuccess = (event) => {
        response.data = event.target.result
        response.success = true
        resolve(response)
      }
      result.onerror = (event) => {
        response.data = event.type
        response.success = false
        reject(response)
      }
    }
  })
}

/**
 * Function that returns the containers list of a specific container.
 * @param {string} nodeId - a string with the node's id
 * @return {Promise<ResponseObject>} - promise resolved with the container object or with error
 */
export function getNodeContainers (nodeId: string): Promise<ResponseObject> {
  return new Promise((resolve, reject) => {
    let db = openDatabase()
    let response: ResponseObject = {}

    db.onsuccess = () => {
      let connection = getDatabaseConnection(db)
      let currentNode = connection.store.get(nodeId)
      currentNode.onsuccess = (event) => {
        response.data = event.target.result.containers
        response.success = true
        resolve(response)
      }
      currentNode.onerror = (event) => {
        response.data = event.type
        response.success = false
        reject(response)
      }
    }
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
    let response: ResponseObject = {}

    getNodeContainers(nodeId).then(result => {
      let container = result.data.containers.filter(cont => cont.Id === containerId)
      response.data = container
      response.success = true
      resolve(response)
    }).catch(err => {
      response.data = err
      response.success = false
      reject(response)
    })
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
    let response: ResponseObject = {}

    getNodeContainerById(nodeId, containerId).then(result => {
      response.data = result.data.shift().Mounts
      response.success = true
      resolve(response)
    }).catch(err => {
      response.data = err
      response.success = false
      reject(response)
    })
  })
}
