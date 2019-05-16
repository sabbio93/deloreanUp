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
  container: Object
}

function Container (props: Props) {
  const { container } = props
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
              icon={<MaterialIcon icon='view_module' />}
              onClick={() => console.log('Open dialog with container data')}
            />
            <Fab
              title='Backup container mounts'
              mini
              icon={<MaterialIcon icon='backup' />}
              onClick={() => console.log('Backup this container mounts')}
            />
          </div>
        )} />
      </ListItem>
      <ListDivider />
    </div>
  )
}

export default Container
