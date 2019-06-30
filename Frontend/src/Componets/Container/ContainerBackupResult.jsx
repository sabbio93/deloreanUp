// @flow
import React, { Component } from 'react'
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton
} from '@material/react-dialog'
import type { BackupResultDialog } from '../../types'
import moment from 'moment'

type Props = {
  backupResultDialog: BackupResultDialog,
  toggleDialogBackupResult: Function
}

class ContainerBackupResult extends Component<Props> {
  onClose = () => {
    const { toggleDialogBackupResult } = this.props
    toggleDialogBackupResult()
  }

  render () {
    const { backupResultDialog } = this.props

    const backupResults = backupResultDialog.backupResults.map((backupResult, index) => {
      const createdAt = moment(backupResult.createdAt)
      return (
        <tr key={index}>
          <td className='backup-name-columns'>{backupResult.backupName}</td>
          <td className='container-name-columns'>{backupResult.containerName}</td>
          <td className='hostname-columns'>{backupResult.hostname}</td>
          <td className='created-at-columns'>{createdAt.format('DD-MM-YYYY HH:mm:ss')}</td>
        </tr>
      )
    })

    return (
      <Dialog
        open={backupResultDialog.isOpen}
        className='backup-result-dialog'
        onClose={this.onClose}
      >
        <DialogTitle>Backup results</DialogTitle>
        <DialogContent>
          <table className='delorean-table'>
            <thead>
              <tr>
                <th className='backup-name-columns'>Backup Name</th>
                <th className='container-name-columns'>Container Name</th>
                <th className='hostname-columns'>Hostname</th>
                <th className='created-at-columns'>Created At</th>
              </tr>
            </thead>
            <tbody>
              { backupResults }
            </tbody>
          </table>
        </DialogContent>
        <DialogFooter>
          <DialogButton action='dismiss'>Dismiss</DialogButton>
        </DialogFooter>
      </Dialog>
    )
  }
}

export default ContainerBackupResult
