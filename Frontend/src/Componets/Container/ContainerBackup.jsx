// @flow
import React, { Component } from 'react'
import { Headline6 } from '@material/react-typography'
import MaterialIcon from '@material/react-material-icon'
import type { BackupEntry, BackupList, BackupResult, BackupStatus } from '../../types'
import LinearProgress from '@material/react-linear-progress'

import { postContainerBackup } from '../../plugins/docNodes'

type Props = {
  backupList: BackupList,
  dialogContainerIsOpen: boolean,
  handleBackupListChange: Function,
  changeBackupEntryStatus: Function,
  removeAllBackupEntries: Function,
  toggleDialogBackupResult: Function
}

type State = {
  reduced: boolean,
  canClose: boolean,
  overallStatus: BackupStatus,
  backupResults: { [key: string]: Array<BackupResult> }
}

class ContainerBackup extends Component<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      reduced: false,
      canClose: false,
      overallStatus: 'none',
      backupResults: {}
    }
  }

  componentDidMount () {
    if (this.props.dialogContainerIsOpen) {
      this.setState({ reduced: true })
    }
    this.startNewBackup()
  }

  componentDidUpdate (prevProps: Props) {
    if (prevProps.dialogContainerIsOpen !== this.props.dialogContainerIsOpen) {
      if (this.props.dialogContainerIsOpen) {
        this.setState({ reduced: true })
      }
    }
    this.startNewBackup()
  }

  startNewBackup = () => {
    const { changeBackupEntryStatus } = this.props
    // Get all the new backupEntry that need to be started
    const backupToStart = this.props.backupList.filter(backupEntry => backupEntry.status === 'none')

    if (backupToStart.length > 0) {
      this.setState({ reduced: false })
    }

    backupToStart.map(backupEntry => {
      // Start the backup for each entry
      // Before change the status to running
      changeBackupEntryStatus(backupEntry, 'running')
      // Update the overallStatus because a new backup is started
      this.computeCurrentState()
      // Request the server to start the backup
      postContainerBackup(backupEntry.nodeId, backupEntry.containerId)
        .then(result => {
          // Add a new BackupResult on the state
          const { backupResults } = this.state
          backupResults[backupEntry.nodeId + '_' + backupEntry.containerId] = result.data.backups
          this.setState({ backupResults })
          // Update status to done
          changeBackupEntryStatus(backupEntry, 'done')
          // Update the overallStatus because a backup is ended
          this.computeCurrentState()
        })
        .catch(err => {
          console.log(err)
          changeBackupEntryStatus(backupEntry, 'error')
          alert(err.toString())
        })
    })
  }

  handleMinimizeFullClcik = () => {
    this.setState(state => {
      return {
        reduced: !state.reduced
      }
    })
  }

  computeCurrentState = () => {
    const { backupList } = this.props
    const backupDone = backupList.filter(entry => entry.status === 'done')

    // If the length of backupDone is equal to backupList means that all the backups are completed
    if (backupDone.length === backupList.length) {
      this.setState({
        overallStatus: 'done',
        canClose: true
      })
    } else {
      this.setState({
        overallStatus: 'running',
        canClose: false
      })
    }
  }

  onEntryDismiss = (backupEntry: BackupEntry, index: number) => {
    const { handleBackupListChange } = this.props
    // Can dismiss a BackupEntry only if the status is done
    if (backupEntry.status === 'done' || backupEntry.status === 'error') {
      handleBackupListChange(backupEntry, index)
    }
  }

  onBackupDialogClose = () => {
    const { overallStatus, canClose } = this.state
    const { removeAllBackupEntries } = this.props
    // Can dismiss all BackupEntry only if all the status are done and canClose is true
    if (overallStatus === 'done' && canClose) {
      removeAllBackupEntries()
      this.setState({
        reduced: false
      })
    }
  }

  onBackupEntryResultClick = (nodeId: string, containerId: string) => {
    const { backupResults } = this.state
    const { toggleDialogBackupResult } = this.props
    // Add the requested BackupResult array to the ContainerBackupDialog
    toggleDialogBackupResult(backupResults[nodeId + '_' + containerId])
    this.setState({ reduced: true })
  }

  render () {
    const { backupList } = this.props
    const { reduced, canClose, overallStatus } = this.state

    let dialogWrapperClass = 'backup-dialog-wrapper'
    if (backupList.length > 0) {
      dialogWrapperClass += ' open'
    }

    return (
      <div className={dialogWrapperClass}>
        <div className='backup-dialog-header'>
          <div className='title'>
            <Headline6 className='backup-dialog-title' tag='h2' >
              {overallStatus === 'done' ? 'Backups done' : 'Performing backups'}
            </Headline6>
          </div>
          <div className='actions'>
            <MaterialIcon
              className='action control-size-icon'
              icon={reduced ? 'fullscreen' : 'minimize'}
              onClick={this.handleMinimizeFullClcik}
              title={reduced ? 'Expand backup dialog' : 'Reduce backup dialog'}
            />
            <MaterialIcon
              className={canClose ? 'action close-icon active' : 'action close-icon disabled'}
              title='Close backup dialog'
              icon='close'
              onClick={this.onBackupDialogClose}
            />
          </div>
        </div>
        <div className={reduced ? 'backup-dialog-content reduced' : 'backup-dialog-content'}>
          <table className='delorean-table'>
            <thead>
              <tr>
                <th>Node ID</th>
                <th>Container ID</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {backupList.map((backupEntry, index) => (
                <tr key={index}>
                  <td className='text-center'>{backupEntry.nodeId}</td>
                  <td>
                    <div className='backup-dialog-entry-progress'>
                      {backupEntry.containerId}
                      {backupEntry.status === 'running' ? (
                        <LinearProgress
                          className='progress-bar'
                          buffer={1}
                          progress={0.5}
                          indeterminate
                        />
                      ) : null}
                    </div>
                  </td>
                  <td className='text-center'>
                    <MaterialIcon title={backupEntry.status} className={`backup-status ${backupEntry.status}`} icon='radio_button_checked' />
                  </td>
                  <td>
                    <MaterialIcon
                      title='Backup entry results'
                      className={backupEntry.status === 'done' || backupEntry.status === 'error' ? 'action' : 'action disabled'}
                      icon='more_vert'
                      onClick={() => this.onBackupEntryResultClick(backupEntry.nodeId, backupEntry.containerId)}
                    />
                    <MaterialIcon
                      title='Remove entry'
                      className={backupEntry.status === 'done' || backupEntry.status === 'error' ? 'action' : 'action disabled'}
                      icon='close'
                      onClick={() => this.onEntryDismiss(backupEntry, index)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default ContainerBackup
