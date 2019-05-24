// @flow
import React from 'react'
import AppBar from '../Componets/Layout/AppBar'
import { Cell, Grid, Row } from '@material/react-layout-grid'
import NodeList from '../Componets/Node/NodeList'
import type { DialogContainer } from '../types'
import ContainerDialog from '../Componets/Container/ContainerDialog'

type Props = {
  title: string,
  logo: string,
  nodes: Array<Object>,
  dialogContainer: DialogContainer,
  toggleDialogContainer: Function
}

function Main (props: Props) {
  const { title, logo, nodes, dialogContainer, toggleDialogContainer } = props
  return (
    <div className='app'>
      <AppBar title={title} logo={logo} />
      <div className='main-content'>
        <Grid>
          <Row>
            <Cell columns={12}>
              <NodeList nodes={nodes} toggleDialogContainer={toggleDialogContainer} />
              {dialogContainer.isOpen ? (
                <ContainerDialog
                  dialogContainer={dialogContainer}
                  toggleDialogContainer={toggleDialogContainer}
                />
              ) : null}
            </Cell>
          </Row>
        </Grid>
      </div>
    </div>
  )
}

export default Main
