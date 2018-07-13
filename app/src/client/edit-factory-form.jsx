import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import * as FactoryValidators from './factory-validators';
import { Factory } from './factory';
import { IntegerControl } from './integer-control';
import { TextControl } from './text-control';

export class EditFactoryForm extends PureComponent {
  constructor(props) {
    super(props);
    const { actions, factoryState } = props;
    this.state = { ...factoryState };

    this.handleUpdateAttributes = () => {
      this.props.onUpdateAttributes({ ...this.state, name: undefined });
    };
    this.handleUpdateName = () => {
      this.props.onUpdateName({ id: this.state.id, name: this.state.name });
    };

    /*********************/
    /** Action Handlers **/
    /*********************/
    this.handleUpdateAttributes = () => {
      actions.regenerateFactory(this.state);
      actions.closeModal();
    };
    this.handleUpdateName = () => {
      actions.renameFactory(this.state);
      actions.closeModal();
    };
    this.handleRemoveFactory = () => {
      actions.removeFactory(this.state);
      actions.closeModal();
    };

    /*******************/
    /** State Updates **/
    /*******************/
    this.updateName = name => {
      this.setState({ ...this.state, name });
    };
    this.updateRangeMin = rangeMin => {
      this.setState({ ...this.state, rangeMin });
    };
    this.updateRangeMax = rangeMax => {
      this.setState({ ...this.state, rangeMax });
    };
    this.updateNumChildren = numChildren => {
      numChildren = Math.min(numChildren, 15);
      numChildren = Math.max(numChildren, 0);
      this.setState({
        ...this.state,
        numChildren
      });
    };

    /*****************/
    /** Validations **/
    /*****************/
    this.nameValidator = () => FactoryValidators.nameValidator(this.state);
    this.rangeMinValidator = () =>
      FactoryValidators.rangeMinValidator(this.state);
    this.rangeMaxValidator = () =>
      FactoryValidators.rangeMaxValidator(this.state);
    this.numChildrenValidator = () =>
      FactoryValidators.numChildrenValidator(this.state);

    this.updateAttributesEnabled = () => {
      return !(
        this.rangeMinValidator() ||
        this.rangeMaxValidator() ||
        this.numChildrenValidator()
      );
    };
  }

  render() {
    return (
      <div className="card card-block factory-form">
        <div className="title-block">
          <h3 className="title">Update Factory Name</h3>
        </div>
        <form>
          <TextControl
            label="Factory Name"
            onChange={this.updateName}
            validator={this.nameValidator}
            value={this.state.name}
          />
          <div className="form-group col">
            <button
              type="button"
              disabled={this.nameValidator()}
              className="btn btn-primary form-control"
              onClick={this.handleUpdateName}
            >
              Update Name
            </button>
          </div>
        </form>

        <hr />

        <div className="title-block">
          <h3 className="title">Update Factory Attributes and Regenerate</h3>
        </div>
        <form>
          <IntegerControl
            label="Minimum Value"
            onChange={this.updateRangeMin}
            validator={this.rangeMinValidator}
            value={this.state.rangeMin}
          />
          <IntegerControl
            label="Maximum Value"
            onChange={this.updateRangeMax}
            validator={this.rangeMaxValidator}
            value={this.state.rangeMax}
          />
          <IntegerControl
            label="# Child Nodes"
            min={0}
            max={15}
            onChange={this.updateNumChildren}
            validator={this.numChildrenValidator}
            value={this.state.numChildren}
          />
          <div className="form-group col">
            <button
              type="button"
              disabled={!this.updateAttributesEnabled()}
              className="btn btn-primary form-control"
              onClick={this.handleUpdateAttributes}
            >
              Update Attributes and Regenerate
            </button>
          </div>

          <hr />

          <div className="form-group col">
            <button
              type="button"
              className="btn btn-secondary form-control"
              onClick={this.props.actions.closeModal}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger form-control"
              onClick={this.handleRemoveFactory}
            >
              DELETE THIS FACTORY
            </button>
          </div>
        </form>
      </div>
    );
  }
}

EditFactoryForm.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  factoryState: PropTypes.object.isRequired
};
