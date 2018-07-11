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
      try {
        message = JSON.parse(message);
        console.log('**** Request');
        console.log(message);
        await processAction(message);
        const treeState = await getTreeState();
        const response = Actions.getTreeState(treeState);
        sendAll(JSON.stringify(response));
      } catch (e) {
        console.error(e);
      }
    });

    const treeState = await getTreeState();
    client.send(JSON.stringify(Actions.getTreeState(treeState)));
  } catch (e) {
    console.error(e);
  }
}
