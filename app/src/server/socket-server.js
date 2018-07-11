import { getTreeState, processAction } from '#server/db-actions';
import { Actions } from '#shared/actions';

let clients = [];

function sendAll(message) {
  console.log(message);
  clients.forEach(client => client.send(message));
}

export async function registerSocketClient(client) {
  try {
    clients.push(client);

    client.on('message', async message => {
      try {
        message = JSON.parse(message);
        console.log('**** Request');
        console.log(message);
        await processAction(message);
        const treeState = await getTreeState();
        const response = Actions.getTreeState({ treeState });
        console.log('**** Response');
        console.log(response);
        sendAll(JSON.stringify(response));
      } catch (e) {
        // console.error(e);
        sendAll(
          JSON.stringify(
            Actions.throwError({ message: 'SOMETHING WENT HORRIBLY WRONG' })
          )
        );
      }
    });

    const treeState = await getTreeState();
    client.send(JSON.stringify(Actions.getTreeState({ treeState })));
  } catch (e) {
    console.error(e);
  }
}
