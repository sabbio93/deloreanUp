// @flow
import { hot } from 'react-hot-loader'
import React from 'react'
import './assets/style/app.scss'
import logo from './assets/images/logo.png'
import type { DialogContainer, BackupList, BackupEntry, BackupStatus } from './types'

// Layout
import Main from './Layout/Main'

// Plugins
import { getNodes } from './plugins/backendApater/docNodes'

type Props = {};

type State = {
  title: string,
  nodes: Array<Object>,
  dialogContainer: DialogContainer,
  backupList: BackupList
};

class App extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      title: 'Delorean Up', // Title of application
      nodes: [], // List of docNode entities
      dialogContainer: { // Object with data to open the container dialog
        isOpen: false,
        nodeId: null,
        containerId: null
      },
      backupList: []
    }
  }

  componentDidMount () {
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

  removeAllBackupEntries = () => {
    this.setState({ backupList: [] })
  }

  render () {
    const { title, nodes, dialogContainer, backupList } = this.state

    return (
      <div>
        <Main
          title={title}
          logo={logo}
          nodes={nodes}
          dialogContainer={dialogContainer}
          backupList={backupList}
          toggleDialogContainer={this.toggleDialogContainer}
          handleBackupListChange={this.handleBackupListChange}
          changeBackupEntryStatus={this.changeBackupEntryStatus}
          removeAllBackupEntries={this.removeAllBackupEntries}
        />
      </div>
    )
  }
}

export default hot(module)(App)
