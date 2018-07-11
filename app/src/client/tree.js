import React from 'react';
import PropTypes from 'prop-types';

import { Factory } from './factory';

export const Tree = ({ treeState, actions }) => {
  return (
    <div>
      <div className="card">
        <div className="card-body row new-factory-form">
          <div className="form-group col">
            <label>Factory Name</label>
            <input id="factory-name" className="form-control" type="text" />
          </div>
          <div className="form-group col">
            <label>Minimum Value</label>
            <input
              id="factory-range-min"
              className="form-control"
              type="number"
            />
          </div>
          <div className="form-group col">
            <label>Maximum Value</label>
            <input
              id="factory-range-max"
              className="form-control"
              type="number"
            />
          </div>
          <div className="form-group col">
            <label># Child Nodes</label>
            <input
              id="factory-num-children"
              className="form-control"
              type="number"
            />
          </div>
        </div>
      </div>

      <div className="row">
        <button
          className="btn btn-primary"
          onClick={() =>
            actions.addFactory({
              name: 'Added',
              numChildren: 5,
              rangeMin: -100,
              rangeMax: 500
            })
          }
        >
          Add Factory
        </button>
      </div>

      {/* TODO: Move this lambda outside the return statement */}
      <ul>
        {treeState.map((factoryState, index) => (
          <Factory key={index} actions={actions} factoryState={factoryState} />
        ))}
      </ul>
    </div>
  );
};

// TODO: more specific
Tree.proptypes = {
  treeState: PropTypes.arrayOf(PropTypes.object).isRequired
};
