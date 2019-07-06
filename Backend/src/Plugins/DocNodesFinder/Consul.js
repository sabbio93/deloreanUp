import consul from 'consul'

function getAllNodes () {
  consul({ promisify: true })
  return consul.catalog.service.nodes('docNode')
}

export { getAllNodes }
