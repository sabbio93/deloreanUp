import DocNode from 'model/DocNode'

function getConfiguredPlugins()
{
    return [staticCode]
}

function getAllNodeList()
{
    return getConfiguredPlugins().map(plugin=>plugin.getAllNodes())
}

