import WebSocket from 'ws';
import { getTreeState, processAction } from '#server/db-actions';
import { Actions } from '#shared/actions';

let clients = [];

function sendAll(message) {
  console.log(message);
  // Send only to OPEN sockets
  clients
    .filter(client => client.readyState === WebSocket.OPEN)
    .forEach(client => client.send(message));

  // Prune CLOSED sockets
  clients = clients.filter(client => client.readyState !== WebSocket.CLOSED);
}

export async function registerSocketClient(client) {
  try {
    clients.push(client);

    client.on('message', async message => {
      let request;
      try {
        request = JSON.parse(message);
        console.log('**** Request');
        console.log(request);
        await processAction(request);
        const treeState = await getTreeState();
        const response = Actions.getTreeState(treeState);
        sendAll(JSON.stringify(response));
      } catch (e) {
        console.error(e);
        if (e.message.indexOf('Unexpected token') === -1) {
          console.error('vvvv REQUEST THAT BROKE THINGS vvvv');
          console.error(request);
          console.error('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
        } else {
          console.error('vvvv MESSAGE THAT BROKE THINGS vvvv');
          console.error(message);
          console.error('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
        }
      }
    });
  } catch (e) {
    console.error(e);
  }
}
