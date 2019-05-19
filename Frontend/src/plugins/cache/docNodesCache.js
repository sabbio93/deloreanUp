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

export function clearCache (): Promise<ResponseObject> {
  return new Promise((resolve, reject) => {
    let db = openDatabase()
    let response: ResponseObject = {}

    db.onsuccess = () => {
      let connection = getDatabaseConnection(db)
      let result = connection.store.clear()
      result.onsuccess = (event) => {
        response.success = true
        response.data = event.type
        resolve(response)
      }
      result.onerror = (event) => {
        response.success = false
        response.data = event.type
        reject(response)
      }
    }
  })
}

export function addNode (node: Object): Promise<ResponseObject> {
  return new Promise((resolve, reject) => {
    let db = openDatabase()
    let response: ResponseObject = {}

    db.onsuccess = () => {
      let connection = getDatabaseConnection(db)
      let result = connection.store.add(node)
      result.onsuccess = (event) => {
        response.success = true
        response.data = event.type
        resolve(response)
      }
      result.onerror = (event) => {
        response.success = false
        response.data = event.type
        reject(response)
      }
    }
  })
}

// function addContainer (nodeId: string, container: Object): Promise<ResponseObject> {
// return
// }

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

// function getNodeContainers (nodeId: string): Promise<ResponseObject> {
//   return
// }

// function getNodeContainerById (nodeId: string, containerId: string): Promise<ResponseObject> {
//   return
// }

// function getNodeContainerMounts (nodeId: string, containerId: string): Promise<ResponseObject> {
//   return
// }

export function deleteCache (): Promise<ResponseObject> {
  let responseObject: ResponseObject = { }

  return new Promise((resolve, reject) => {
    let dbRequest = IDB.deleteDatabase(DB_NAME)
    dbRequest.onsuccess = (event) => {
      responseObject.success = true
      responseObject.data = event.target.result
      resolve(responseObject)
    }
    dbRequest.onerror = () => {
      responseObject.success = false
      responseObject.data = event.target.result
      reject(responseObject)
    }
  })
}
