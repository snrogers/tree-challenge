import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

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
    this.nameValidator = () =>
      this.state.name ? null : 'Factory name required';
    this.rangeMinValidator = () => {
      if (this.state.rangeMin !== 0 && !this.state.rangeMin) {
        // Required
        return 'Minimum value required';
      } else if (
        // <= rangeMax
        (this.state.rangeMax === 0 || this.state.rangeMax) &&
        this.state.rangeMin > this.state.rangeMax
      ) {
        return 'Must be less than or equal to maximum value';
      } else {
        // Valid
        return null;
      }
    };
    this.rangeMaxValidator = () => {
      if (this.state.rangeMax !== 0 && !this.state.rangeMax) {
        // Required
        return 'Maximum value required';
      } else if (
        // <= rangeMax
        (this.state.rangeMin === 0 || this.state.rangeMin) &&
        this.state.rangeMin > this.state.rangeMax
      ) {
        return 'Must be greater than or equal to minimum value';
      } else {
        // Valid
        return null;
      }
    };
    this.numChildrenValidator = () => {
      if (!this.state.numChildren && this.state.numChildren !== 0) {
        return 'Number of child nodes required';
      } else {
        return null;
      }
    };
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
