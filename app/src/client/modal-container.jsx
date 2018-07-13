import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { EditFactoryForm } from './edit-factory-form';
import { Modal } from 'reactstrap';
import { NewFactoryForm } from './new-factory-form';

export class ModalContainer extends PureComponent {
  constructor(props) {
    super(props);
  }

  switchModal() {
    switch (this.props.modalState.modalType) {
      case 'NEW_FACTORY':
        return (
          <NewFactoryForm
            actions={this.props.actions}
            factoryState={this.props.modalState.factoryState}
          />
        );
      case 'EDIT_FACTORY':
        return (
          <EditFactoryForm
            actions={this.props.actions}
            factoryState={this.props.modalState.factoryState}
          />
        );
      default:
        return null;
    }
  }

  render() {
    return (
      <Modal
        isOpen={this.props.modalState.isOpen}
        toggle={this.props.actions.closeModal}
      >
        {this.switchModal()}
      </Modal>
    );
  }
}

ModalContainer.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  modalState: PropTypes.object.isRequired
};
