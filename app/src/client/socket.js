let _dispatch = null;
let _socket = null;
let _store = null;

let messageListeners = [];

let responseHandler = (function() {
  return message => {};
})();

// Sends Actions to server via WebSocket if actionObj._remote === true
export function bindSocketActionCreators(actions, dispatch) {
  if (!_dispatch) _dispatch = dispatch;

  return Object.entries(actions).reduce((sum, [key, actionFn]) => {
    sum[key] = (...args) => {
      const actionObj = actionFn.apply(null, args);
      if (actionObj._remote) {
        const actionJSON = JSON.stringify(actionObj);
        _socket.send(actionJSON);
      } else {
        _dispatch(actionObj);
      }
    };
    return sum;
  }, {});
}

export function openSocketConnection() {
  // Compute host address
  let host = location.origin;
  host = host.slice(host.indexOf('://') + 3, host.length);
  if (host.indexOf(':') !== -1) {
    // connect @ port 4000 in development
    host = host.slice(0, host.indexOf(':') + 1) + '4000';
  }
  host = 'ws://' + host;

  // FIRE IT UP
  _socket = window.socket = new WebSocket(host);
  _socket.onopen = () => {};

  // Handle Messages
  _socket.onmessage = message => {
    console.log('=== MESSAGE ===');
    console.log(message);
    _dispatch(JSON.parse(message.data));
  };

  // Reconnect if you lose connection
  _socket.onclose = function() {
    openSocketConnection();
  };
}
