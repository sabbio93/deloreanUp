// @flow
import React from 'react'
import MaterialIcon from '@material/react-material-icon'
import {
  ListItem,
  ListItemText,
  ListItemGraphic,
  ListItemMeta,
  ListDivider
} from '@material/react-list'
import ContainerList from './ContainerList'

type Props = {
  node: Object,
  active: boolean,
  index: number,
  onClick: Function
}

function Node (props: Props) {
  const { node, active, index, onClick } = props

  return (
    <div className='node-item-wrapper'>
      <ListItem selected={active} onClick={() => onClick(index)}>
        <ListItemGraphic graphic={<MaterialIcon icon='settings_system_daydream' />} />
        <ListItemText primaryText={(
          <div className='node-item'>
            <span className='node-id'>{node.id}</span>
            <span className='node-host'>{`${node.protocol}://${node.ip}:${node.port}`}</span>
            <span className='node-api-version'>{node.apiVersion}</span>
          </div>
        )} />
        <ListItemMeta meta={<MaterialIcon icon={active ? 'keyboard_arrow_up' : 'keyboard_arrow_down'} />} />
      </ListItem>
      <div className={'node-containers-list ' + (active ? 'active' : '')}>
        {active ? <ContainerList nodeId={node.id} /> : null}
      </div>
      <ListDivider />
    </div>
  )
}

Node.defaultProps = {
  active: false
}

export default Node
