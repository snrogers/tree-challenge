import { assert } from 'chai';

import {
  ADD_FACTORY,
  GET_TREE_STATE,
  REMOVE_FACTORY,
  THROW_ERROR,
  UPDATE_FACTORY,
  addFactory,
  getTreeState,
  removeFactory,
  throwError,
  updateFactory
} from '#shared/actions';

describe('addFactory', () => {
  it('specifies the name, number of children, and range of the children', () => {
    const name = 'TestFactory';
    const numChildren = 10;
    const range = [-100, 100];

    const action = addFactory({ name, numChildren, range });

    assert(
      action.type === ADD_FACTORY,
      `Expected action.type to be: ${ADD_FACTORY.toString()}, got: ${action.type.toString()}`
    );
    assert(
      action.name === name,
      `Expected action.name to be: ${name}, got: ${action.name}`
    );
    assert(
      action.numChildren === numChildren,
      `Expected action.numChildren to be: ${numChildren}, got: ${
        action.numChildren
      }`
    );
    assert(
      action.range[0] === range[0] && action.range[1] === range[1],
      `Expected action.range to be: ${range}, got: ${action.range}`
    );
  });
});

describe('getTreeState', () => {
  it('contains the received treeState', () => {
    const treeState = [];

    const action = getTreeState({ treeState });

    assert(
      action.type === GET_TREE_STATE,
      `Expected action.type to be: ${GET_TREE_STATE.toString()}, got: ${action.type.toString()}`
    );
    assert(
      action.treeState === treeState,
      `Expected action.treeState to be: ${treeState}, got: ${action.treeState}`
    );
  });

  it('requires numChildren to range from 0 to 15', () => {
    const factories = [
      {
        name: 'TestFactory',
        numChildren: -1,
        range: [-100, 100]
      },
      {
        name: 'TestFactory',
        numChildren: 0,
        range: [-100, 100]
      },
      {
        name: 'TestFactory',
        numChildren: 15,
        range: [-100, 100]
      },
      {
        name: 'TestFactory',
        numChildren: 16,
        range: [-100, 100]
      }
    ].forEach(factory => {
      let error;

      try {
        const action = addFactory(factory);
      } catch (e) {
        error = e;
      }

      if (factory.numChildren < 0 || factory.numChildren > 15) {
        assert(error, `Expected numChildren OOB error, got: nothing`);
        assert(
          error.message === 'numChildren out of bounds',
          `Expected error.message to be: "numChildren out of bounds", got: ${
            error.message
          }`
        );
      } else {
        assert(!error, `Expected no errors, got: ${error && error.message}`);
      }
    });
  });
});

describe('removeFactory', () => {
  it('specifies the id', () => {
    const id = 500;

    const action = removeFactory({ id });

    assert(
      action.type === REMOVE_FACTORY,
      `Expected action.type to be: ${REMOVE_FACTORY.toString()}, got: ${action.type.toString()}`
    );
    assert(
      action.id === id,
      `Expected action.id to be: ${id}, got: ${action.id}`
    );
  });
});

describe('throwError', () => {
  it('fires a toast', () => {
    throw new Error('UNIMPLEMENTED');
  });
});

describe('updateFactory', () => {
  const id = 1;
  const name = 'TestUpdateFactory';
  const numChildren = 14;
  const range = [-10, 10];

  const action = updateFactory({ id, name, numChildren, range });

  assert(
    action.type === UPDATE_FACTORY,
    `Expected action.type to be: ${ADD_FACTORY.toString()}, got: ${action.type.toString()}`
  );
  assert(
    action.id === id,
    `Expected action.id to be: ${id}, got: ${action.id}`
  );
  assert(
    action.name === name,
    `Expected action.name to be: ${name}, got: ${action.name}`
  );
  assert(
    action.numChildren === numChildren,
    `Expected action.numChildren to be: ${numChildren}, got: ${
      action.numChildren
    }`
  );
  assert(
    action.range[0] === range[0] && action.range[1] === range[1],
    `Expected action.range to be: ${range}, got: ${action.range}`
  );

  it('requires numChildren to range from 0 to 15', () => {
    const factories = [
      {
        name: 'TestFactory',
        numChildren: -1,
        range: [-100, 100]
      },
      {
        name: 'TestFactory',
        numChildren: 0,
        range: [-100, 100]
      },
      {
        name: 'TestFactory',
        numChildren: 15,
        range: [-100, 100]
      },
      {
        name: 'TestFactory',
        numChildren: 16,
        range: [-100, 100]
      }
    ].forEach(factory => {
      let error;

      try {
        const action = addFactory(factory);
      } catch (e) {
        error = e;
      }

      if (factory.numChildren < 0 || factory.numChildren > 15) {
        assert(error, `Expected numChildren OOB error, got: nothing`);
        assert(
          error.message === 'numChildren out of bounds',
          `Expected error.message to be: "numChildren out of bounds", got: ${
            error.message
          }`
        );
      } else {
        assert(!error, `Expected no errors, got: ${error && error.message}`);
      }
    });
  });
});
