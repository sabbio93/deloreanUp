// @flow
import React from 'react'
import AppBar from '../Componets/AppBar'
import {Cell, Grid, Row} from '@material/react-layout-grid'

type Props = {
  title: string,
  logo: string
}

function Main (props: Props) {
  const { title, logo } = props
  return (
    <div className='app'>
      <AppBar title={title} logo={logo} />
      <div className='main-content'>
        <Grid>
          <Row>
            <Cell columns={12}>
              <p>This is a simple test using Roboto font</p>
            </Cell>
          </Row>
        </Grid>
      </div>
    </div>
  )
}

export default Main
