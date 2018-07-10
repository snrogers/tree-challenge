import React from 'react';
import PropTypes from 'prop-types';

export const Factory = ({ factoryState }) => (
  <ul>
    <label>{factoryState.name}</label>
    {factoryState.children.map((node, index) => <ul key={index}>{node}</ul>)}
  </ul>
);
