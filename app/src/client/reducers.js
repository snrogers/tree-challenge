import { GET_TREE_STATE } from '#shared/actions';

const defaultState = [
  { id: 0, name: 'First Factory', children: [1, 2, 3, 4, 5] },
  { id: 1, name: 'Second', children: [2, 4, 6, 8, 10] },
  { id: 2, name: 'Third', children: [3, 6, 9, 12, 15] }
];

export const rootReducer = function(state = defaultState, action) {
  switch (action.type) {
    case GET_TREE_STATE:
      return action.treeState;
    default:
      return state;
  }
};
