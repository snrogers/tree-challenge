import { getTreeState, processAction } from '#server/db';
import { Actions } from '#shared/actions';

let clients = [];

function sendAll(message) {
  console.log(message);
  clients.forEach(client => client.send(message));
}

export function registerSocketClient(client) {
  clients.push(client);

  client.on('message', async message => {
    console.log('**** Request');
    console.log(message);
    await processAction(message);
    const treeState = await getTreeState();
    const response = Actions.getTreeState({ treeState });
    console.log('**** Response');
    console.log(response);
    sendAll(JSON.stringify(response));
  });

  // client.send('TODO: Initialize from DB');
}
