// @flow
import React, { Component } from 'react'
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton
} from '@material/react-dialog'
import type { DialogContainer } from '../../types'
import { getNodeContainerById } from '../../plugins/backendApater/docNodes'
import ContainerView from './ContainerView'

type Props = {
  dialogContainer: DialogContainer,
  toggleDialogContainer: Function
}

type State = {
  container: Object | null
}

class ContainerDialog extends Component<Props, State> {
  state = {
    container: null
  }

  componentDidMount () {
    const { dialogContainer } = this.props
    if (dialogContainer.nodeId && dialogContainer.containerId) {
      getNodeContainerById(dialogContainer.nodeId, dialogContainer.containerId)
        .then(response => {
          if (response.success) {
            this.setState({
              container: response.data
            })
          } else {
            console.log(response.data)
          }
        })
        .catch(err => console.log(err))
    }
  }

  render () {
    const { dialogContainer, toggleDialogContainer } = this.props
    const { container } = this.state

    if (container === null) {
      return null
    }

    return (
      <Dialog
        open={dialogContainer.isOpen}
        onClose={toggleDialogContainer}
        className='container-dialog'
      >
        <DialogTitle>{`Container ${container.Names[0]}`}</DialogTitle>
        <DialogContent>
          <ContainerView container={container} />
        </DialogContent>
        <DialogFooter>
          <DialogButton action='dismiss'>Dismiss</DialogButton>
          <DialogButton action='accept' isDefault>Backup Container</DialogButton>
        </DialogFooter>
      </Dialog>
    )
  }
}

export default ContainerDialog
