import * as docNodesApi from '../../../src/plugins/backendApater/docNodes'

describe('backend nodes adapter using Promises', () => {
  /*
   * Before start test remember to set a valid node id and a valid container id
   */
  const nodeId = '1'
  const containerId = '6e475b5f90a0caf066e21457c95cdf47dba2c3becae64c4d1502668b82a906d7'

  it('should get list of Nodes', () => {
    return docNodesApi.getNodes()
      .then(res => {
        expect(res.success).toBeDefined()
        expect(res.success).toBe(true)
        expect(res.data).toBeDefined()
        expect(res.data.nodes).toBeDefined()
        if (res.data.nodes.length > 0) {
          res.data.nodes.map(nodeObject => {
            expect(nodeObject.id).toBeDefined()
            expect(nodeObject.ip).toBeDefined()
            expect(nodeObject.port).toBeDefined()
            expect(nodeObject.protocol).toBeDefined()
            expect(nodeObject.apiVersion).toBeDefined()
          })
        }
      })
      .catch(err => { throw err })
  })

  it('should get list of Containers', () => {
    return docNodesApi.getNodeContainers(nodeId)
      .then(res => {
        expect(res.success).toBeDefined()
        expect(res.success).toBe(true)
        expect(res.data).toBeDefined()
        expect(res.data.containers).toBeDefined()
        if (res.data.containers.length > 0) {
          res.data.containers.map(containerObject => {
            expect(containerObject.Id).toBeDefined()
            expect(containerObject.Names).toBeDefined()
            expect(containerObject.Image).toBeDefined()
            expect(containerObject.ImageID).toBeDefined()
            expect(containerObject.Mounts).toBeDefined()
          })
        }
      })
  })

  it('should get a Container', () => {
    return docNodesApi.getNodeContainerById(nodeId, containerId)
      .then(res => {
        expect(res.success).toBeDefined()
        expect(res.success).toBe(true)
        expect(res.data).toBeDefined()
        expect(res.data.Id).toBeDefined()
        expect(res.data.Names).toBeDefined()
        expect(res.data.Image).toBeDefined()
        expect(res.data.ImageID).toBeDefined()
        expect(res.data.Mounts).toBeDefined()
      })
  })

  it('should get list of Mounts', () => {
    return docNodesApi.getNodeContainerMounts(nodeId, containerId)
      .then(res => {
        expect(res.success).toBeDefined()
        expect(res.success).toBe(true)
        expect(res.data).toBeDefined()
        expect(res.data.mounts).toBeDefined()
        if (res.data.mounts.length > 0) {
          res.data.mounts.map(mountObject => {
            expect(mountObject.Source).toBeDefined()
            expect(mountObject.Type).toBeDefined()
            expect(mountObject.Name).toBeDefined()
            expect(mountObject.Destination).toBeDefined()
          })
        }
      })
  })

  it('should get list of Backup', () => {
    return docNodesApi.postContainerBackup(nodeId, containerId)
      .then(res => {
        expect(res.success).toBeDefined()
        expect(res.success).toBe(true)
        expect(res.data).toBeDefined()
        expect(res.data.backups).toBeDefined()
        if (res.data.backups.length > 0) {
          res.data.backups.map(backupObject => {
            expect(backupObject.containerName).toBeDefined()
            expect(backupObject.backupName).toBeDefined()
            expect(backupObject.createdAt).toBeDefined()
            expect(backupObject.hostname).toBeDefined()
          })
        }
      })
  })
})
