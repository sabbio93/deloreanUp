// @flow

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
  tx: Object,
  store: Object
}

const openDatabase = () => {
  if (!('indexedDB' in window)) {
    alert('IndexedDB not supported')
    return
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

const getDatabaseConnection: IndexedDatabaseConnection = (openedDB) => {
  let connection: IndexedDatabaseConnection = {}

  connection.result = openedDB.result
  connection.tx = connection.result.transaction(STORE_NAME, 'readwrite')
  connection.store = connection.tx.objectStore(STORE_NAME)

  return connection
}

export function deleteCache (): Promise<ResponseObject> {
  return new Promise((resolve, reject) => {
    let dbRequest = IDB.deleteDatabase(DB_NAME)
    dbRequest.onsuccess = (event) => resolve(event.type)
    dbRequest.onerror = (event) => reject(event.type)
  })
}

export function clearCache (): Promise<string> {
  return new Promise((resolve, reject) => {
    let db = openDatabase()

    db.onsuccess = () => {
      let connection = getDatabaseConnection(db)
      let result = connection.store.clear()
      result.onsuccess = (event) => resolve(event.type)
      result.onerror = (event) => reject(event.type)
    }
  })
}

export function addNode (node: Object): Promise<string> {
  return new Promise((resolve, reject) => {
    let db = openDatabase()

    db.onsuccess = () => {
      let connection = getDatabaseConnection(db)
      let result = connection.store.put(node)
      result.onsuccess = (event) => resolve(event.type) // alternative return connection.tx.complete (is a promise)
      result.onerror = (event) => reject(event.type)
    }
  })
}

export function addContainers (nodeId: string, containers: Array<Object>): Promise<string> {
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
