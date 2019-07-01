// @flow
import React, { Component } from 'react'
import { getNodeContainers } from '../../plugins/backendApater/docNodes'
import List, {
  ListGroup,
  ListGroupSubheader, ListItem, ListItemText, ListItemMeta
} from '@material/react-list'
import { Subtitle1 } from '@material/react-typography'
import ContainerItem from './ContainerItem'

type Props = {
  nodeId: string,
  toggleDialogContainer: Function, // Comes from App.jsx
  handleBackupListChange: Function
}

type State = {
  containers: Array<mixed> // Mixed should be replaced with a type Container that has all the properties of a container
}

class ContainerList extends Component <Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      containers: []
    }
  }

  componentDidMount () {
    const { nodeId } = this.props
    getNodeContainers(nodeId)
      .then(response => {
        if (response.success) {
          this.setState({ containers: response.data.containers })
        } else {
          console.log(response.data)
        }
      })
      .catch(err => console.log(err))
  }

  render () {
    const { nodeId, toggleDialogContainer, handleBackupListChange } = this.props
    const { containers } = this.state

    // Create the container list elements
    const containerList = containers.map((container, index) => (
      <div key={index}><ContainerItem
        nodeId={nodeId}
        container={container}
        toggleDialogContainer={toggleDialogContainer}
        handleBackupListChange={handleBackupListChange}
      /></div>
    ))

    return (
      <div className='container-list-wrapper'>
        <ListGroup>
          <ListGroupSubheader tag='div'><Subtitle1 tag='h4'>Active Containers of the Node (NodeId: {nodeId})</Subtitle1></ListGroupSubheader>
          <List nonInteractive >
            <ListItem>
              <ListItemText primaryText={<div className='container-list-header'>
                <span className='container-id'>ID</span>
                <span className='container-image'>Image</span>
                <span className='container-name'>Name</span>
                <ListItemMeta meta={<span className='container-actions'>Actions</span>} />
              </div>} />
            </ListItem>
          </List>
          <List>
            {containerList}
          </List>
        </ListGroup>
      </div>
    )
  }
}

export default ContainerList
