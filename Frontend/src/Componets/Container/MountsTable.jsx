// @flow
import React from 'react'
import { Headline5 } from '@material/react-typography'
import MaterialIcon from '@material/react-material-icon'

type Props = {
  mounts: Array<Object>
}

function MountsTable (props: Props) {
  const { mounts } = props
  return (
    <div className='mounts-info'>
      <Headline5 className='heading' tag='h6'>Mounts info</Headline5>
      <div className='delorean-table-wrapper'>
        <table className='delorean-table'>
          <thead>
            <tr>
              <th>
              Type
              </th>
              <th>
              Destination
              </th>
              <th>
              Source
              </th>
              <th>
              Driver
              </th>
              <th>
              RW
              </th>
            </tr>
          </thead>
          <tbody>
            {mounts.map((mount, index) => (
              <tr key={index}>
                <td>{mount.Type}</td>
                <td>{mount.Destination}</td>
                <td>{mount.Source}</td>
                <td>{mount.Driver}</td>
                <td>{mount.RW ? <MaterialIcon icon='done' /> : <MaterialIcon icon='clear' /> }</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MountsTable
