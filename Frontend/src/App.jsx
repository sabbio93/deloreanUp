// @flow
import { hot } from 'react-hot-loader'
import React from 'react'
import './assets/style/app.scss'
import logo from './assets/images/logo.png'

// Layout
import Main from './Layouts/Main'

type Props = {};

type State = {
  title: string,
};

class App extends React.Component<Props, State> {
  state = {
    title: 'Delorean Up'
  }

  render () {
    const { title } = this.state

    return (
      <div>
        <Main title={title} logo={logo} />
      </div>
    )
  }
}

export default hot(module)(App)
