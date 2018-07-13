import { assert } from 'chai';

import {
  ADD_FACTORY,
  GET_TREE_STATE,
  REMOVE_FACTORY,
  REGENERATE_FACTORY,
  RENAME_FACTORY,
  addFactory,
  getTreeState,
  removeFactory,
  regenerateFactory,
  renameFactory
} from '#shared/actions';

describe('addFactory', () => {
  it('requires rangeMin <= rangeMax', () => {
    const factories = [
      {
        name: 'TestFactory',
        numChildren: 5,
        range: [-100, 100]
      },
      {
        name: 'TestFactory',
        numChildren: 7,
        range: [100, -100]
      },
      {
        name: 'TestFactory',
        numChildren: 1,
        range: [-100, 100]
      },
      {
        name: 'TestFactory',
        numChildren: 10,
        range: [500, 100]
      }
    ].forEach(factory => {
      let error;

      try {
        const action = addFactory(factory);
      } catch (e) {
        error = e;
      }

      if (factory.rangeMin > factory.rangeMax) {
        assert(error, `Expected range error, got: nothing`);
        assert(
          error.message === 'rangeMin > rangeMax',
          `Expected error.message to be: "rangeMin > rangeMax", got: ${
            error.message
          }`
        );
      } else {
        assert(!error, `Expected no errors, got: ${error && error.message}`);
      }
    });
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

describe('getTreeState', () => {
  it("ain't nothin but a type", () => {
    const treeState = [];
    const action = getTreeState();

    assert(
      action.type === GET_TREE_STATE,
      `Expected action.type to be: ${GET_TREE_STATE}, got: ${action.type}`
    );
  });
});

describe('removeFactory', () => {
  it('specifies the id', () => {
    const id = 500;
    const action = removeFactory({ id });

    assert(
      action.type === REMOVE_FACTORY,
      `Expected action.type to be: ${REMOVE_FACTORY}, got: ${action.type}`
    );
    assert(
      action.factory.id === id,
      `Expected action.factory.id to be: ${id}, got: ${action.id}`
    );
  });
});

describe('regenerateFactory', () => {
  it('requires rangeMin <= rangeMax', () => {
    const factories = [
      {
        name: 'TestFactory',
        numChildren: 5,
        range: [-100, 100]
      },
      {
        name: 'TestFactory',
        numChildren: 7,
        range: [100, -100]
      },
      {
        name: 'TestFactory',
        numChildren: 1,
        range: [-100, 100]
      },
      {
        name: 'TestFactory',
        numChildren: 10,
        range: [500, 100]
      }
    ].forEach(factory => {
      let error;

      try {
        const action = regenerateFactory(factory);
      } catch (e) {
        error = e;
      }

      if (factory.rangeMin > factory.rangeMax) {
        assert(error, `Expected range error, got: nothing`);
        assert(
          error.message === 'rangeMin > rangeMax',
          `Expected error.message to be: "rangeMin > rangeMax", got: ${
            error.message
          }`
        );
      } else {
        assert(!error, `Expected no errors, got: ${error && error.message}`);
      }
    });
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
        const action = regenerateFactory(factory);
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
