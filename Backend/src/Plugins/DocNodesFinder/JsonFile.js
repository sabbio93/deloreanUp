import fs from 'fs'

class JsonFile {
  /**
     *
     * @param path {String}
     */
  constructor (path) {
    this.pathfile = path
  }

  getAllNodes () {
    let rawdata = fs.readFileSync(this.pathfile)
    return JSON.parse(rawdata)
  }
}

export default JsonFile
