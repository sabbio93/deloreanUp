import JsonFile from '../../../src/plugins/docNodesFinder/jsonFile'
import DocNode from '../../../src/model/DocNode'
import fs from 'fs'

const docNodes = [
  new DocNode('1', '192.168.1.1', 80),
  new DocNode('2', '192.168.1.2', 80),
  new DocNode('3', '192.168.1.3', 100)
]
describe('simple', () => {
  it('should be sane', () => {
    let data = JSON.stringify(docNodes)
    fs.writeFileSync('testFile.json', data)
    let jsonfile = new JsonFile('testFile.json')
    const sc = jsonfile.getAllNodes()
    expect(sc.length).toBe(3)
    fs.unlink('testFile.json', (err) => {
      if (err) throw err
    })
  })
})
