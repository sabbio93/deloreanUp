// @flow
import React, { Component } from 'react'
import { Headline6 } from '@material/react-typography'
import MaterialIcon from '@material/react-material-icon'
import type {BackupList, BackupStatus} from '../../types'

type Props = {
  backupList: BackupList,
  handleBackupListChange: Function,
}

type State = {
  status: BackupStatus
}

class ContainerBackup extends Component<Props, State> {

  componentDidMount() {
    const backupToStart = this.props.backupList.filter(backupEntry => backupEntry.status === 'none')
    console.log(backupToStart)
  }

  componentDidUpdate() {
    const backupToStart = this.props.backupList.filter(backupEntry => backupEntry.status === 'none')
    console.log(backupToStart)
  }

  render () {
    const { backupList, handleBackupListChange } = this.props

    return (
      <div className="backup-dialog-wrapper">
        <div className='backup-dialog-header'>
          <div className='title'>
            <Headline6 className='backup-dialog-title' tag="h2" >Performing backups</Headline6>
          </div>
          <div className='actions'>
            <MaterialIcon icon='minimize' />
            <MaterialIcon icon='close' />
          </div>
        </div>
        {backupList.map((backupEntry, index) => (
          <div key={index}>
            <p>NodeID: {backupEntry.nodeId}</p>
            <p>ContainerID: {backupEntry.containerId}</p>
            <p>Status: {backupEntry.status}</p>
          </div>
        ))}
      </div>
    )
  }
}

export default ContainerBackup
