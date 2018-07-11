import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export class IntegerControl extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = e => {
      this.props.onChange(Number(e.target.value));
    };

    if (this.props.validator) {
      this.isValid = () => this.props.validator(this.props.value);
    } else {
      this.isValid = () => '\u00a0';
    }
  }

  render() {
    return (
      <div className={'form-group col has-error'}>
        <label className="control-label">{this.props.label}</label>
        <input
          type="number"
          className="form-control boxed"
          increment="1"
          min={this.props.min}
          max={this.props.max}
          onChange={this.handleChange}
          value={this.props.value.toString()}
        />
        <span className={'has-error'}>{this.isValid() || '\u00a0'}</span>
      </div>
    );
  }
}
