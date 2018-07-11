export const ADD_FACTORY = 'ADD_FACTORY';
export const GET_TREE_STATE = 'GET_TREE_STATE';
export const REMOVE_FACTORY = 'REMOVE_FACTORY';
export const UPDATE_FACTORY = 'UPDATE_FACTORY';

/*
 NOTE: All actions include a 'treeState' arg, as these actions are
 all used as both requests and responses, and will be
 returned from the server with an updated treeState before being
 dispatched to the Redux Store
*/

export function getTreeState({ treeState }) {
  return {
    type: GET_TREE_STATE,
    treeState
  };
}

export function addFactory({ id, name, numChildren, range, treeState }) {
  if (numChildren < 0 || numChildren > 15)
    throw new Error('numChildren out of bounds');
  return {
    type: ADD_FACTORY,
    id,
    name,
    numChildren,
    range,
    treeState
  };
}

export function removeFactory({ id, treeState }) {
  return {
    type: REMOVE_FACTORY,
    id,
    treeState
  };
}

export function updateFactory({ id, name, numChildren, range, treeState }) {
  if (numChildren < 0 || numChildren > 15)
    throw new Error('numChildren out of bounds');
  return {
    type: UPDATE_FACTORY,
    id,
    name,
    numChildren,
    range,
    treeState
  };
}

export const Actions = {
  addFactory,
  getTreeState,
  removeFactory,
  updateFactory
};
