// @flow
import React from 'react'
import AppBar from '../Componets/Layout/AppBar'
import { Cell, Grid, Row } from '@material/react-layout-grid'
import NodeList from '../Componets/NodeList'

type Props = {
  title: string,
  logo: string,
  nodes: Array<Object>
}

function Main (props: Props) {
  const { title, logo, nodes } = props
  return (
    <div className='app'>
      <AppBar title={title} logo={logo} />
      <div className='main-content'>
        <Grid>
          <Row>
            <Cell columns={12}>
              <NodeList nodes={nodes} />
            </Cell>
          </Row>
        </Grid>
      </div>
    </div>
  )
}

export default Main
