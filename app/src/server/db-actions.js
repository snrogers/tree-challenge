import * as FactoryValidators from '#shared/factory-validators';

import {
  ADD_FACTORY,
  GET_TREE_STATE,
  REGENERATE_FACTORY,
  REMOVE_FACTORY,
  RENAME_FACTORY
} from '#shared/actions';
import { Factory } from '#db/models';

export async function getTreeState() {
  return await Factory.findAll({ order: [['createdAt', 'DESC']] });
}

function regenerated(factory) {
  return {
    ...factory,
    children: Array(factory.numChildren)
      .fill(0)
      .map(
        () =>
          factory.rangeMin +
          Math.floor(Math.random() * (factory.rangeMax - factory.rangeMin + 1))
      )
  };
}

export async function processAction(action) {
  let dbFactory;
  switch (action.type) {
    case ADD_FACTORY:
      if (
        FactoryValidators.rangeMinValidator(action.factory) ||
        FactoryValidators.rangeMaxValidator(action.factory) ||
        FactoryValidators.numChildrenValidator(action.factory)
      ) {
        return;
      }
      const factory = regenerated(action.factory);
      await Factory.create(factory, {
        fields: ['name', 'rangeMin', 'rangeMax', 'numChildren', 'children']
      });
      break;
    case GET_TREE_STATE:
      break;
    case REGENERATE_FACTORY:
      if (
        FactoryValidators.rangeMinValidator(action.factory) ||
        FactoryValidators.rangeMaxValidator(action.factory) ||
        FactoryValidators.numChildrenValidator(action.factory)
      ) {
        return;
      }
      dbFactory = await Factory.find({
        where: { id: action.factory.id }
      });
      await dbFactory.update(regenerated(action.factory), {
        fields: ['rangeMin', 'rangeMax', 'numChildren', 'children']
      });
      break;
    case REMOVE_FACTORY:
      await Factory.destroy({ where: { id: action.factory.id } });
      break;
    case RENAME_FACTORY:
      dbFactory = await Factory.find({
        where: { id: action.factory.id }
      });
      await dbFactory.update(action.factory, {
        fields: ['name']
      });
      break;
    default:
      console.error(`**** Unrecognized action.type: ${action.type}`);
  }
}
