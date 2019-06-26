// @flow
import React from 'react'
import MaterialIcon from '@material/react-material-icon'
import {
  ListItem,
  ListItemText,
  ListItemMeta,
  ListDivider
} from '@material/react-list'
import Fab from '@material/react-fab'

type Props = {
  nodeId: string,
  container: Object,
  toggleDialogContainer: Function, // Comes from App.jsx
  handleBackupListChange: Function
}

function ContainerItem (props: Props) {
  const { nodeId, container, toggleDialogContainer, handleBackupListChange } = props

  function openContainerDialog () {
    toggleDialogContainer(nodeId, container.Id)
  }

  function startBackup () {
    handleBackupListChange({
        nodeId: nodeId,
        containerId: container.Id,
        status: 'none'
      })
  }

  return (
    <div className='container-item-wrapper'>
      <ListItem>
        <ListItemText primaryText={(
          <div className='container-item'>
            <span className='container-id'><span>{container.Id}</span></span>
            <span className='container-image'><span>{container.Image}</span></span>
            <span className='container-name'><span>{container.Names[0]}</span></span>
          </div>
        )} />
        <ListItemMeta meta={(
          <div className='container-actions'>
            <Fab
              title='Open container details'
              mini
              icon={<MaterialIcon icon='more_vert' />}
              onClick={() => openContainerDialog()}
            />
            <Fab
              title='Backup container mounts'
              mini
              icon={<MaterialIcon icon='backup' />}
              onClick={() => startBackup()}
            />
          </div>
        )} />
      </ListItem>
      <ListDivider />
    </div>
  )
}

export default ContainerItem
