import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import * as FactoryValidators from './factory-validators';
import { Factory } from './factory';
import { IntegerControl } from './integer-control';
import { TextControl } from './text-control';

export class NewFactoryForm extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      rangeMin: '',
      rangeMax: '',
      numChildren: ''
    };

    this.handleSubmit = () => {
      this.props.actions.addFactory(this.state);
      this.props.actions.closeModal();
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
    this.submissionEnabled = () => {
      return !(
        this.nameValidator() ||
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
          <h3 className="title">Add New Factory</h3>
        </div>
        <form>
          <TextControl
            label="Factory Name"
            onChange={this.updateName}
            validator={this.nameValidator}
            value={this.state.name}
          />
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
          <button
            type="button"
            disabled={!this.submissionEnabled()}
            className="btn btn-primary form-control"
            onClick={this.handleSubmit}
          >
            Add Factory
          </button>
          {this.props.children}
        </form>
      </div>
    );
  }
}

NewFactoryForm.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  factoryState: PropTypes.object.isRequired
};
