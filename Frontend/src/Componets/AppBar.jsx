// @flow
import React from 'react'
import TopAppBar, {
  TopAppBarIcon,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle
} from '@material/react-top-app-bar'
import MaterialIcon from '@material/react-material-icon'

type Props = {
  title: string,
  logo: string
}

function AppBar (props: Props) {
  const { title, logo } = props
  return (
    <TopAppBar>
      <TopAppBarRow>
        <TopAppBarSection align='start'>
          <TopAppBarIcon navIcon tabIndex={0}>
            <MaterialIcon hasRipple icon='menu' onClick={() => console.log('Open drawer')} />
          </TopAppBarIcon>
          <TopAppBarTitle>
            <div className='app-bar-logo'>
              <div className='logo'>
                <img className='app-bar-logo' src={logo} alt={title} />
              </div>
              <div className='title'>
                { title }
              </div>
            </div>
          </TopAppBarTitle>
        </TopAppBarSection>
        <TopAppBarSection align='end' role='toolbar'>
          <TopAppBarIcon actionItem tabIndex={0}>
            <MaterialIcon
              aria-label='refresh page'
              hasRipple
              icon='refresh'
              onClick={() => console.log('refresh')}
            />
          </TopAppBarIcon>
        </TopAppBarSection>
      </TopAppBarRow>
    </TopAppBar>
  )
}

export default AppBar
