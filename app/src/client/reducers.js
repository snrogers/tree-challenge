import {
  ACTIVATE_EDIT_FACTORY_MODAL,
  ACTIVATE_NEW_FACTORY_MODAL,
  CLOSE_MODAL,
  GET_TREE_STATE
} from '#shared/actions';

const defaultState = {
  modalState: { isOpen: false },
  treeState: []
};

export const rootReducer = function(state = defaultState, action) {
  switch (action.type) {
    case ACTIVATE_EDIT_FACTORY_MODAL:
      return {
        ...state,
        modalState: {
          factoryState: action.factory,
          isOpen: true,
          modalType: 'EDIT_FACTORY'
        }
      };
    case ACTIVATE_NEW_FACTORY_MODAL:
      return {
        ...state,
        modalState: {
          isOpen: true,
          modalType: 'NEW_FACTORY'
        }
      };
    case CLOSE_MODAL:
      return { ...state, modalState: { isOpen: false } };
    case GET_TREE_STATE:
      return { ...state, treeState: action.treeState };
    default:
      return state;
  }
};
