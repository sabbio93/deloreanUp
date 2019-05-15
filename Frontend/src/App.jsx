// @flow
import { hot } from 'react-hot-loader'
import React, { useState } from 'react'
import Buttons from './Componets/Buttons'
import { Headline2 } from '@material/react-typography'
import MaterialIcon from '@material/react-material-icon'
import './assets/style/app.scss'
import logo from './assets/images/logo.png'

function App () {
  const title: string = 'Welcome to Delorean Up'
  const [clickCount, setClickCount] = useState(0)

  function handleClick () {
    return setClickCount(clickCount + 1)
  }

  return (
    <div className='app'>
      <div className='header'>
        <img src={logo} alt='Delorean Logo' className='header-logo' />
        <Headline2 tag='h1' className='header-title'>{title}</Headline2>
      </div>
      <Buttons
        text='Click Me & Add One!'
        trailingIcon={<MaterialIcon icon='plus_one' />}
        onClick={handleClick}
      />
      <Buttons text='Nothing button' className='btn-secondary' onClick={() => console.log('Nothing')} />
      <p>This is a simple test using Roboto font</p>
      <p className='clicked'>
        Button clicked <span>{clickCount}</span> times
      </p>
    </div>
  )
}

export default hot(module)(App)
