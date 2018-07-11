import { GET_TREE_STATE } from '#shared/actions';

const defaultState = [];

export const rootReducer = function(state = defaultState, action) {
  switch (action.type) {
    case GET_TREE_STATE:
      return action.treeState;
    default:
      return state;
  }
};
