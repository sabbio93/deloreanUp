// @flow
import { hot } from 'react-hot-loader'
import React from 'react'
import './assets/style/app.scss'
import logo from './assets/images/logo.png'
import type { DialogContainer } from './types'

// Layout
import Main from './Layout/Main'

// Plugins
import { getNodes } from './plugins/backendApater/docNodes'

type Props = {};

type State = {
  title: string,
  nodes: Array<Object>,
  dialogContainer: DialogContainer,
};

class App extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      title: 'Delorean Up',
      nodes: [],
      dialogContainer: {
        isOpen: false,
        nodeId: null,
        containerId: null
      }
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

  render () {
    const { title, nodes, dialogContainer } = this.state

    return (
      <div>
        <Main
          title={title}
          logo={logo}
          nodes={nodes}
          dialogContainer={dialogContainer}
          toggleDialogContainer={this.toggleDialogContainer}
        />
      </div>
    )
  }
}

export default hot(module)(App)
