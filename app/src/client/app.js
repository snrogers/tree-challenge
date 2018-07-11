import React from 'react';
import { connect } from 'react-redux';

import { Actions } from '#shared/actions';
import { Tree } from './tree';
import { bindSocketActionCreators } from './socket';

const AppComponent = ({ treeState, actions }) => (
  <div className="container">
    <div className="row">
      <div className="col">
        <div className="card">
          <div className="card-body">
            <h1 className="card-title">Tree Challenge</h1>
            <Tree actions={actions} treeState={treeState} />
          </div>
        </div>
      </div>
    </div>
  </div>
);

function mapStateToProps(state) {
  return {
    treeState: state
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindSocketActionCreators(Actions, dispatch)
  };
}

export const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppComponent);
