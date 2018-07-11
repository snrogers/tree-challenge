import {
  ADD_FACTORY,
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
      const factory = regenerated(action.factory);
      console.log(factory);
      await Factory.create(factory);
      break;
    case REGENERATE_FACTORY:
      dbFactory = await Factory.find({
        where: { id: action.factory.id }
      });
      await dbFactory.update(regenerated(action.factory));
      break;
    case REMOVE_FACTORY:
      await Factory.destroy({ where: { id: action.factory.id } });
      break;
    case RENAME_FACTORY:
      dbFactory = await Factory.find({
        where: { id: action.factory.id }
      });
      await dbFactory.update({ name: action.factory.name });
      break;
    default:
      console.error(`**** Unrecognized action.type: ${action.type}`);
  }
}
