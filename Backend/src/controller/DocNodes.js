import * as staticCode from 'Plugins/DocNodesFinder/staticCode'

function getConfiguredPlugins () {
  return [staticCode]
}

function getAllNodeList () {
  return getConfiguredPlugins().map(plugin => plugin.getAllNodes())
}
