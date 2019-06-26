// @flow
import React from 'react'
import AppBar from '../Componets/Layout/AppBar'
import { Cell, Grid, Row } from '@material/react-layout-grid'
import NodeList from '../Componets/Node/NodeList'
import type {DialogContainer, BackupList} from '../types'
import ContainerDialog from '../Componets/Container/ContainerDialog'
import ContainerBackup from '../Componets/Container/ContainerBackup'

type Props = {
  title: string,
  logo: string,
  nodes: Array<Object>,
  dialogContainer: DialogContainer,
  backupList: BackupList,
  toggleDialogContainer: Function,
  handleBackupListChange: Function
}

function Main (props: Props) {
  const {
    title,
    logo,
    nodes,
    dialogContainer,
    backupList,
    toggleDialogContainer,
    handleBackupListChange
  } = props

  return (
    <div className='app'>
      <AppBar title={title} logo={logo} />
      <div className='main-content'>
        <Grid>
          <Row>
            <Cell columns={12}>
              <NodeList
                nodes={nodes}
                toggleDialogContainer={toggleDialogContainer}
                handleBackupListChange={handleBackupListChange}
              />

              {dialogContainer.isOpen ? (
                <ContainerDialog
                  dialogContainer={dialogContainer}
                  toggleDialogContainer={toggleDialogContainer}
                  handleBackupListChange={handleBackupListChange}
                />
              ) : null }

              {backupList.length > 0 ? (
                <ContainerBackup
                  backupList={backupList}
                  handleBackupListChange={handleBackupListChange}
                />
              ) : null }
            </Cell>
          </Row>
        </Grid>
      </div>
    </div>
  )
}

export default Main
