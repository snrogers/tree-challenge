import { ADD_FACTORY, REMOVE_FACTORY } from '#shared/actions';
import { Factory } from '#db/models';
const mockTreeState = [
  { id: 3, name: 'FROM THE SERVER', children: [5, 10, 15, 20, 25] }
];

export async function getTreeState() {
  const factories = await Factory.findAll();
  return factories;
}

export async function processAction(action) {
  switch (action.type) {
    case ADD_FACTORY:
      const factory = {
        ...action,
        type: undefined,
        children: Array(action.numChildren)
          .fill(0)
          .map(() =>
            Math.floor(
              action.rangeMin +
                Math.random() * (action.rangeMax - action.rangeMin)
            )
          )
      };
      console.log(factory);
      await Factory.create(factory);
      break;
    case REMOVE_FACTORY:
      await Factory.destroy({ where: { id: action.id } });
      break;
    default:
      console.error(`**** Unrecognized action.type: ${action.type}`);
  }
}
