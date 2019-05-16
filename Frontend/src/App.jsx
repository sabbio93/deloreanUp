// @flow
import { hot } from 'react-hot-loader'
import React from 'react'
import './assets/style/app.scss'
import logo from './assets/images/logo.png'

// Layout
import Main from './Layout/Main'

// Plugins
import { getNodes } from './plugins/backendApater/docNodes'

type Props = {};

type State = {
  title: string,
  nodes: Array<Object>
};

class App extends React.Component<Props, State> {
  state = {
    title: 'Delorean Up',
    nodes: []
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

  render () {
    const { title, nodes } = this.state

    return (
      <div>
        <Main
          title={title}
          logo={logo}
          nodes={nodes}
        />
      </div>
    )
  }
}

export default hot(module)(App)
