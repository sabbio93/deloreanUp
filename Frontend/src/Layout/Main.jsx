// @flow
import React from 'react'
import AppBar from '../Componets/Layout/AppBar'
import { Cell, Grid, Row } from '@material/react-layout-grid'
import NodeList from '../Componets/Node/NodeList'
import type { DialogContainer, BackupList, BackupResultDialog } from '../types'
import ContainerDialog from '../Componets/Container/ContainerDialog'
import ContainerBackup from '../Componets/Container/ContainerBackup'
import ContainerBackupResult from '../Componets/Container/ContainerBackupResult'

type Props = {
  title: string,
  logo: string,
  nodes: Array<Object>,
  dialogContainer: DialogContainer,
  backupList: BackupList,
  backupResultDialog: BackupResultDialog,
  toggleDialogContainer: Function,
  handleBackupListChange: Function,
  changeBackupEntryStatus: Function,
  removeAllBackupEntries: Function,
  toggleDialogBackupResult: Function
}

function Main (props: Props) {
  const {
    title,
    logo,
    nodes,
    dialogContainer,
    backupList,
    backupResultDialog,
    toggleDialogContainer,
    handleBackupListChange,
    changeBackupEntryStatus,
    removeAllBackupEntries,
    toggleDialogBackupResult
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

              <ContainerBackup
                backupList={backupList}
                dialogContainerIsOpen={dialogContainer.isOpen}
                handleBackupListChange={handleBackupListChange}
                changeBackupEntryStatus={changeBackupEntryStatus}
                removeAllBackupEntries={removeAllBackupEntries}
                toggleDialogBackupResult={toggleDialogBackupResult}
              />

              {backupResultDialog.isOpen ? (
                <ContainerBackupResult
                  backupResultDialog={backupResultDialog}
                  toggleDialogBackupResult={toggleDialogBackupResult}
                />
              ) : null}
            </Cell>
          </Row>
        </Grid>
      </div>
    </div>
  )
}

export default Main
