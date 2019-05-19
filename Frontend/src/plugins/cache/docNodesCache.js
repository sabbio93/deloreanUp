// @flow

const IDB = window.indexedDB
const DB_NAME = 'DeloreanStorage'
const STORE_NAME = 'nodeOS'
const OS_KEY = 'nodeId'
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

export function initCache (): Promise<ResponseObject> {
  let responseObject: ResponseObject = { }

  return new Promise((resolve, reject) => {
    if (!('indexedDB' in window)) {
      alert('IndexedDB not supported')
      responseObject.success = false
      responseObject.data = 'IndexedDB not supported'
      reject(responseObject)
    }

    let dbRequest = IDB.open(DB_NAME, VERSION)

    dbRequest.onerror = () => {
      responseObject.success = false
      responseObject.data = this.error
      reject(responseObject)
    }

    dbRequest.onsuccess = () => {
      console.log('IDB request done')
    }

    dbRequest.onupgradeneeded = (event) => {
      responseObject.success = true
      let db = event.target.result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: OS_KEY })
        responseObject.data = 'OS created'
      } else {
        responseObject.data = 'OS exists'
      }
    }
  })
}

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

// function clearCache (): Promise<ResponseObject> {

// }

// function addNode (): Promise<ResponseObject> {
//   return
// }

// function addContainer (nodeId: string): Promise<ResponseObject> {
//   return
// }

// function getNodes (): Promise<ResponseObject> {
//   return
// }

// function getNodeContainers (nodeId: string): Promise<ResponseObject> {
//   return
// }

// function getNodeContainerById (nodeId: string, containerId: string): Promise<ResponseObject> {
//   return
// }

// function getNodeContainerMounts (nodeId: string, containerId: string): Promise<ResponseObject> {
//   return
// }
