// @flow
import React, { Component } from 'react'
import Node from './Node'
import List, {
  ListGroup,
  ListGroupSubheader, ListItem, ListItemText, ListItemGraphic
} from '@material/react-list'
import { Headline5 } from '@material/react-typography'
import MaterialIcon from '@material/react-material-icon'

type Props = {
  nodes: Array<Object>,
  toggleDialogContainer: Function,
  handleBackupListChange: Function
}

type State = {
  selectedIndex: number | null
}

class NodeList extends Component<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      selectedIndex: null
    }
  }

  handleNodeClick = (index: number) => {
    const { selectedIndex } = this.state
    if (selectedIndex === index) {
      this.setState({ selectedIndex: null })
    } else {
      this.setState({ selectedIndex: index })
    }
  }

  render () {
    const { selectedIndex } = this.state
    const { nodes, toggleDialogContainer, handleBackupListChange } = this.props

    // Create the node list elements
    const nodesList = nodes.map((node, index) => (
      <Node
        key={index}
        node={node}
        active={selectedIndex === index}
        index={index}
        onClick={this.handleNodeClick}
        toggleDialogContainer={toggleDialogContainer}
        handleBackupListChange={handleBackupListChange}
      />
    ))

    return (
      <div className='node-list-wrapper'>

        <ListGroup>
          <ListGroupSubheader tag='div'><Headline5 tag='h2'>Active Doc Nodes</Headline5></ListGroupSubheader>
          <List nonInteractive>
            <ListItem>
              <ListItemGraphic graphic={<MaterialIcon icon='' />} />
              <ListItemText primaryText={<div className='node-list-header'>
                <span className='node-id'>ID</span>
                <span className='node-host'>HOST</span>
                <span className='node-api-version'>API Version</span>
              </div>} />
            </ListItem>
          </List>
          <List>
            {nodesList}
          </List>
        </ListGroup>
      </div>
    )
  }
}

export default NodeList
