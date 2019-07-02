// @flow
import { hot } from 'react-hot-loader'
import React from 'react'
import './assets/style/app.scss'
import logo from './assets/images/logo.png'
import type { DialogContainer, BackupList, BackupEntry, BackupStatus, BackupResultDialog, BackupResult } from './types'

// Layout
import Main from './Layout/Main'

// Plugins
import { getNodes } from './plugins/docNodes'
import { clearCache } from './plugins/cache/docNodesCache'

type Props = {};

type State = {
  title: string,
  nodes: Array<Object>,
  dialogContainer: DialogContainer,
  backupList: BackupList,
  backupResultDialog: BackupResultDialog
};

const DEFAULT_STATE = {
  title: 'Delorean Up', // Title of application
  nodes: [], // List of docNode entities
  dialogContainer: { // Object with data to open the container dialog
    isOpen: false,
    nodeId: null,
    containerId: null
  },
  backupList: [], // list of the active container backuping
  backupResultDialog: { // Object with data to open the backup result dialog
    isOpen: false,
    backupResults: []
  }
}

class App extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = DEFAULT_STATE
  }

  componentDidMount () {
    // Load nodes list
    this.loadNodes()
  }

  loadNodes = () => {
    getNodes()
      .then(response => {
        if (response.success) {
          this.setState({
            nodes: response.data.nodes
          })
        } else {
          console.log(response.data)
        }
      })
      .catch(err => console.log(err))
  }

  /**
   * Method to open or close the dialog for the container info
   * @param {string} nodeId
   * @param {string} containerId
   */
  toggleDialogContainer = (nodeId: string, containerId: string) => {
    this.setState(state => {
      // If state.dialogContainer.isOpen === true means that I'm closing it, so nodeId and containerId will be null
      return {
        dialogContainer: {
          isOpen: !state.dialogContainer.isOpen,
          nodeId: state.dialogContainer.isOpen ? null : nodeId,
          containerId: state.dialogContainer.isOpen ? null : containerId
        }
      }
    })
  }

  /**
   * Method to open or close the dialog for the backup result of a container
   * @param {Array<BackupResult>} backupResults
   */
  toggleDialogBackupResult = (backupResults: Array<BackupResult> = []) => {
    this.setState(state => {
      // If state.backupResultDialog.isOpen === true means that I'm closing it, so backupResults will be null
      return {
        backupResultDialog: {
          isOpen: !state.backupResultDialog.isOpen,
          backupResults: state.backupResultDialog.isOpen ? [] : backupResults
        }
      }
    })
  }

  /**
   * Method to add or remove a BackupEnty to the list of active backups
   * @param {BackupEntry} backupEntry
   * @param {number} removeIndex
   */
  handleBackupListChange = (backupEntry: BackupEntry, removeIndex: number | null = null) => {
    const { backupList } = this.state
    if (removeIndex !== null) {
      backupList.splice(removeIndex, 1)
    } else {
      let entryExist = backupList.filter(entry => entry.nodeId === backupEntry.nodeId && entry.containerId === backupEntry.containerId)
      // EntryExist contain only the eventual entry with same nodeId and containerId, so if the entry is already in the list do nothing
      if (entryExist.length === 0) {
        backupList.push(backupEntry)
      }
    }

    this.setState({ backupList })
  }

  /**
   * Change the status of an active BackupEntry
   * @param {BackupEntry} backupEntry
   * @param {BackupStatus} status
   */
  changeBackupEntryStatus = (backupEntry: BackupEntry, status: BackupStatus) => {
    const { backupList } = this.state
    let index = null
    backupList.map((entry, i) => {
      if (entry.nodeId === backupEntry.nodeId && entry.containerId === backupEntry.containerId) {
        index = i
      }
    })
    if (index !== null) {
      backupList[index].status = status
    }
    this.setState({ backupList })
  }

  /**
   * Remove all BackupEntry
   */
  removeAllBackupEntries = () => {
    this.setState({ backupList: [] })
  }

  handleRefreshCache = () => {
    // Set state to the default values
    this.setState(DEFAULT_STATE)
    clearCache()
      .then(result => {
        console.log(result)
        this.loadNodes()
      })
  }

  render () {
    const { title, nodes, dialogContainer, backupList, backupResultDialog } = this.state

    return (
      <div>
        <Main
          title={title}
          logo={logo}
          nodes={nodes}
          dialogContainer={dialogContainer}
          backupList={backupList}
          backupResultDialog={backupResultDialog}
          toggleDialogContainer={this.toggleDialogContainer}
          handleBackupListChange={this.handleBackupListChange}
          changeBackupEntryStatus={this.changeBackupEntryStatus}
          removeAllBackupEntries={this.removeAllBackupEntries}
          toggleDialogBackupResult={this.toggleDialogBackupResult}
          handleRefreshCache={this.handleRefreshCache}
        />
      </div>
    )
  }
}

export default hot(module)(App)
