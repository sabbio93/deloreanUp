import consul from 'consul'

function getAllNodes () {
  consul({ promisify: true })
  return consulo.catalog.service.nodes('docNode')
}
