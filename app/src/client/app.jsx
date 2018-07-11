import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { Actions } from '#shared/actions';
import { ModalContainer } from './modal-container';
import { Tree } from './tree';
import { bindSocketActionCreators } from './socket';

class AppComponent extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div className="container app-container">
          <div className="row justify-content-center">
            <div className="col">
              <h1 className="card-title">Tree Challenge</h1>
              <Tree
                actions={this.props.actions}
                treeState={this.props.treeState}
              />
            </div>
          </div>
        </div>
        <ModalContainer
          actions={this.props.actions}
          modalState={this.props.modalState}
        />
      </>
    );
  }
}

function mapStateToProps({ treeState, modalState }) {
  return { modalState, treeState };
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
