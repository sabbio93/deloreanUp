import * as containers from '../../../src/Plugins/docBridge/containers'
import DocNode from '../../../src/model/DocNode'

const localNode = new DocNode('1', '127.0.0.1', 5555)

describe('Test doc bridge containers plugin', () => {
  it('should be sane', () => {
    containers.getContainersList(localNode)
      .then(response => {
        const containersList = response.data.containers
        expect(Array.isArray(containersList)).toBe(true)
        if (containersList.length > 0) {
          expect(containersList[0]).toBeCalledWith(
            expect.objectContaining({
              Id: expect.any(String)
            })
          )
        }
      })
  })
})
