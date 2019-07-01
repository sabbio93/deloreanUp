// @flow
import React from 'react'
import { Cell, Grid, Row } from '@material/react-layout-grid'
import MountsTable from './MountsTable'
import MaterialIcon from '@material/react-material-icon'

type Props = {
  container: Object
}

function ContainerView (props: Props) {
  const { container } = props

  return (
    <div className='container-view'>
      <div className='general-info'>
        <Grid>
          <Row>
            <Cell columns={12}>
              <p className='info'>
                <span className='info-name'>ID: </span>
                <span className='info-value'>{container.Id}</span>
              </p>
            </Cell>
          </Row>
          <Row>
            <Cell desktopColumns={5} tabletColumns={3} phoneColumns={12}>
              <p className='info'>
                <span className='info-name'>Image: </span>
                <span className='info-value'>{container.Image}</span>
              </p>
            </Cell>
            <Cell desktopColumns={5} tabletColumns={3} phoneColumns={12}>
              <p className='info'>
                <span className='info-name'>Name: </span>
                <span className='info-value'>{container.Names[0]}</span>
              </p>
            </Cell>
            <Cell desktopColumns={2} tabletColumns={2} phoneColumns={12}>
              <p className='info'>
                <span className='info-name'>Status: </span>
                <span className='info-value'>
                  <MaterialIcon
                    icon={container.State === 'running' ? 'radio_button_checked' : 'radio_button_unchecked'}
                    className={container.State === 'running' ? 'run' : 'off'}
                    title={container.Status}
                  />
                </span>
              </p>
            </Cell>
          </Row>
        </Grid>
      </div>
      {container.Mounts.length > 0 ? <MountsTable mounts={container.Mounts} /> : null}
    </div>
  )
}

export default ContainerView
