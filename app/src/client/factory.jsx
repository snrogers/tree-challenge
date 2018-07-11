import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export class Factory extends PureComponent {
  constructor(props) {
    super(props);

    this.handleOpenModal = () =>
      this.props.actions.activateEditFactoryModal(this.props.factoryState);
  }

  render() {
    return (
      <li className="factory">
        <button
          className="btn btn-info"
          onClick={this.handleOpenModal}
          type="button"
        >
          {this.props.factoryState.name}
        </button>

        <ul className="tree">
          {this.props.factoryState.children.map((node, index) => (
            <li key={index} className="leaf">
              {node}
            </li>
          ))}
        </ul>
      </li>
    );
  }
}
