/* @flow */
import React from 'react'
import type { Element } from 'react'
import Button from '@material/react-button'
import * as docNodes from '../plugins/backendApater/docNodes'

type Props = {
  text: string,
  icon?: Element<'MaterialIcon'>,
  trailingIcon?: Element<'MaterialIcon'>,
  className: string,
  onClick: Function
}

function Buttons (props: Props) {
  const { text, icon, trailingIcon, className, onClick } = props
  docNodes.getNodes()
  return (
    <Button
      icon={icon}
      trailingIcon={trailingIcon}
      raised
      className={`button-alternate ${className}`}
      onClick={onClick}
    >
      { text }
    </Button>
  )
}

Buttons.defaultProps = {
  text: 'Click me',
  className: ''
}

export default Buttons
