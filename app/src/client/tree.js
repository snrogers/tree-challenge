import React from 'react';
import PropTypes from 'prop-types';

import { Factory } from './factory';

export const Tree = ({ treeState, actions }) => {
  return (
    <div>
      <button
        className="btn btn-primary"
        onClick={() => actions.addFactory({})}
      >
        +
      </button>
      {/* TODO: Move this lambda outside the return statement */}
      <ul>
        {treeState.map((factoryState, index) => (
          <Factory key={index} factoryState={factoryState} />
        ))}
      </ul>
    </div>
  );
};

// TODO: more specific
Tree.proptypes = {
  treeState: PropTypes.arrayOf(PropTypes.object).isRequired
};
