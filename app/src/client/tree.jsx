import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Modal } from 'reactstrap';

import { Factory } from './factory';
import { NewFactoryForm } from './new-factory-form';
import { IntegerControl } from './integer-control';
import { TextControl } from './text-control';

export class Tree extends PureComponent {
  constructor(props) {
    super(props);

    this.treeStateToFactories = this.treeStateToFactories.bind(this);
  }

  treeStateToFactories(factoryState) {
    return (
      <Factory
        key={factoryState.id}
        actions={this.props.actions}
        factoryState={factoryState}
      >
        <button
          className="btn btn-danger form-control"
          onClick={this.toggleForm}
          type="button"
        >
          Cancel
        </button>
      </Factory>
    );
  }

  render() {
    return (
      <div className="row">
        <div className="col">
          <button
            className="btn btn-info"
            onClick={this.props.actions.activateNewFactoryModal}
            type="button"
          >
            Root
          </button>

          <ul className="tree">
            {this.props.treeState.map(this.treeStateToFactories)}
          </ul>
        </div>
      </div>
    );
  }
}

Tree.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  treeState: PropTypes.arrayOf(PropTypes.object).isRequired
};
