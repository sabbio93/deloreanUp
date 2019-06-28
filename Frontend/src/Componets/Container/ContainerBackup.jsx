// @flow
import React, { Component } from 'react'
import { Headline6 } from '@material/react-typography'
import MaterialIcon from '@material/react-material-icon'
import type { BackupEntry, BackupList, BackupStatus } from '../../types'
import LinearProgress from '@material/react-linear-progress'

import { postContainerBackup } from '../../plugins/backendApater/docNodes'

type Props = {
  backupList: BackupList,
  handleBackupListChange: Function,
  changeBackupEntryStatus: Function,
  removeAllBackupEntries: Function
}

type State = {
  reduced: boolean,
  canClose: boolean,
  overallStatus: BackupStatus
}

class ContainerBackup extends Component<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      reduced: false,
      canClose: false,
      overallStatus: 'none'
    }
  }

  componentDidMount () {
    this.startNewBackup()
  }

  componentDidUpdate () {
    this.startNewBackup()
  }

  startNewBackup = () => {
    const { changeBackupEntryStatus } = this.props
    const backupToStart = this.props.backupList.filter(backupEntry => backupEntry.status === 'none')
    backupToStart.map(backupEntry => {
      // Start the backup for each entry
      changeBackupEntryStatus(backupEntry, 'running')
      this.computeCurrentState()
      postContainerBackup(backupEntry.nodeId, backupEntry.containerId)
        .then(result => {
          console.log(result)
          changeBackupEntryStatus(backupEntry, 'done')
          this.computeCurrentState()
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
    if (backupEntry.status === 'done') {
      handleBackupListChange(backupEntry, index)
    }
  }

  onBackupDialogClose = () => {
    const { overallStatus, canClose } = this.state
    const { removeAllBackupEntries } = this.props
    if (overallStatus === 'done' && canClose) {
      removeAllBackupEntries()
      this.setState({
        reduced: false
      });
    }
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
                      title='Remove entry'
                      className={backupEntry.status === 'done' ? 'action' : 'action disabled'}
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
