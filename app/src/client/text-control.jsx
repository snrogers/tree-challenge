import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export class TextControl extends PureComponent {
  constructor(props) {
    super(props);

    this.handleChange = e => {
      this.props.onChange(e.target.value);
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
          className="form-control boxed"
          type="text"
          onChange={this.handleChange}
          value={this.props.value}
        />
        <span className={'has-error'}>{this.isValid()}</span>
      </div>
    );
  }
}

TextControl.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.node,
  validator: PropTypes.func
};
