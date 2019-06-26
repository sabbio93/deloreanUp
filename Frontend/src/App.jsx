// @flow
import { hot } from 'react-hot-loader'
import React from 'react'
import './assets/style/app.scss'
import logo from './assets/images/logo.png'
import type { DialogContainer, BackupList, BackupEntry } from './types'

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
    if (removeIndex) {
      backupList.splice(removeIndex, 1)
    } else {
      backupList.push(backupEntry)
    }

    this.setState({ backupList });
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
        />
      </div>
    )
  }
}

export default hot(module)(App)
