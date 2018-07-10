import React from 'react';
import PropTypes from 'prop-types';

import { Factory } from './factory';

export const Tree = ({ treeState }) => {
  return (
    <ul>
      {treeState.map((factoryState, index) => (
        <Factory key={index} factoryState={factoryState} />
      ))}
    </ul>
  );
};

// TODO: more specific
Tree.proptypes = {
  treeState: PropTypes.arrayOf(PropTypes.object).isRequired
};
