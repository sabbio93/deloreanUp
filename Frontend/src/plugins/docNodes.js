// @flow
import * as cache from './cache/docNodesCache'
import * as backend from './backendApater/docNodes'

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

const updateNodesCache = () => {
  backend.getNodes().then(res => {
    res.data.nodes.forEach(element => cache.addNode(element))
  })
}

const updateNodesContainersCache = (nodeId) => {
  backend.getNodeContainers(nodeId).then(res => {
    cache.setContainers(nodeId, res.data.containers)
  })
}

export function getNodes (): Promise<ResponseObject> {
  return new Promise((resolve, reject) => {
    cache.getNodes().then(res => {
      if (res.data.nodes && res.data.nodes.length !== 0) {
        resolve(res)
      } else {
        updateNodesCache()
        backend.getNodes().then(res => resolve(res)).catch(err => reject(err))
      }
    }).catch(err => {
      console.log('Error while using cache: ' + err)
      backend.getNodes().then(res => resolve(res)).catch(err => reject(err))
    })
  })
}

export function getNodeContainers (nodeId: string): Promise<ResponseObject> {
  return new Promise((resolve, reject) => {
    cache.getNodeContainers(nodeId).then(res => {
      if (res.data.containers && res.data.containers.length !== 0) {
        resolve(res)
      } else {
        updateNodesContainersCache(nodeId)
        backend.getNodeContainers(nodeId).then(res => resolve(res)).catch(err => reject(err))
      }
    }).catch(err => {
      console.log('Error while using cache: ' + err)
      backend.getNodeContainers(nodeId).then(res => resolve(res)).catch(err => reject(err))
    })
  })
}

export function getNodeContainerById (nodeId: string, containerId: string): Promise<ResponseObject> {
  return new Promise((resolve, reject) => {
    cache.getNodeContainerById(nodeId, containerId).then(res => {
      if (res.data && res.data.length !== 0) {
        resolve(res)
      } else {
        updateNodesContainersCache(nodeId)
        backend.getNodeContainerById(nodeId, containerId).then(res => resolve(res)).catch(err => reject(err))
      }
    }).catch(err => {
      console.log('Error while using cache: ' + err)
      backend.getNodeContainerById(nodeId, containerId).then(res => resolve(res)).catch(err => reject(err))
    })
  })
}

export function getNodeContainerMounts (nodeId: string, containerId: string): Promise<ResponseObject> {
  return new Promise((resolve, reject) => {
    cache.getNodeContainerMounts(nodeId, containerId).then(res => {
      if (res.data.mounts && res.data.mounts.length !== 0) {
        resolve(res)
      } else {
        updateNodesContainersCache(nodeId)
        backend.getNodeContainerMounts(nodeId, containerId).then(res => resolve(res)).catch(err => reject(err))
      }
    }).catch(err => {
      console.log('Error while using cache: ' + err)
      backend.getNodeContainerMounts(nodeId, containerId).then(res => resolve(res)).catch(err => reject(err))
    })
  })
}

export function postContainerBackup (nodeId: string, containerId: string): Promise<ResponseObject> {
  return backend.postContainerBackup(nodeId, containerId)
}
