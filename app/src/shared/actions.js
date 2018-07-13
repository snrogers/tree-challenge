// NOTE: Gotta use strings instead of Symbols since
// most of these are gonna get sent to the server
// and Symbols don't serialize with JSON.stringify
export const ACTIVATE_NEW_FACTORY_MODAL = 'ACTIVATE_NEW_FACTORY_MODAL';
export const ACTIVATE_EDIT_FACTORY_MODAL = 'ACTIVATE_EDIT_FACTORY_MODAL';
export const ADD_FACTORY = 'ADD_FACTORY';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const GET_TREE_STATE = 'GET_TREE_STATE';
export const REGENERATE_FACTORY = 'REGENERATE_FACTORY';
export const REMOVE_FACTORY = 'REMOVE_FACTORY';
export const RENAME_FACTORY = 'RENAME_FACTORY';

// NOTE: { _remote: true } means these will be
// sent to the server rather than to the store
export function addFactory(factory) {
  return {
    _remote: true,
    type: ADD_FACTORY,
    factory
  };
}

export function getTreeState(treeState) {
  return {
    _remote: true,
    type: GET_TREE_STATE,
    treeState
  };
}

export function regenerateFactory(factory) {
  return {
    _remote: true,
    type: REGENERATE_FACTORY,
    factory: { ...factory, name: undefined }
  };
}

export function removeFactory(factory) {
  return {
    _remote: true,
    type: REMOVE_FACTORY,
    factory
  };
}

export function renameFactory(factory) {
  return {
    _remote: true,
    type: RENAME_FACTORY,
    factory
  };
}

// NOTE: These lack { _remote: true} and will therefore *not*
// be sent to the server
export function activateEditFactoryModal(factory) {
  return {
    type: ACTIVATE_EDIT_FACTORY_MODAL,
    factory
  };
}

export function activateNewFactoryModal(factory) {
  return {
    type: ACTIVATE_NEW_FACTORY_MODAL,
    factory
  };
}

export function closeModal() {
  return { type: CLOSE_MODAL };
}

export const Actions = {
  addFactory,
  activateEditFactoryModal,
  activateNewFactoryModal,
  getTreeState,
  regenerateFactory,
  removeFactory,
  renameFactory,
  closeModal
};
