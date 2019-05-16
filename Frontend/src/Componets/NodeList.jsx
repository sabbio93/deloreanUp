// @flow
import React, { useState } from 'react'
import Node from './Node'
import List, {
  ListGroup,
  ListGroupSubheader, ListItem, ListItemText, ListItemGraphic
} from '@material/react-list'
import { Headline5 } from '@material/react-typography'
import MaterialIcon from '@material/react-material-icon'

type Props = {
  nodes: Array<Object>
}

function NodeList (props: Props) {
  const [ selectedIndex, setSelectedIndex ] = useState(null)
  const { nodes } = props

  function handleNodeClick (index) {
    if (selectedIndex === index) {
      setSelectedIndex(null)
    } else {
      setSelectedIndex(index)
    }
  }

  // Create the node list elements
  const nodesList = nodes.map((node, index) => (
    <Node
      key={index}
      node={node}
      active={selectedIndex === index}
      index={index}
      onClick={handleNodeClick} />
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

NodeList.defaultProps = {
  nodes: []
}

export default NodeList
