let _dispatch = null;
let _socket = null;
let _store = null;

let messageListeners = [];

let responseHandler = (function() {
  return message => {};
})();

export function bindSocketActionCreators(actions, dispatch) {
  if (!_dispatch) _dispatch = dispatch; // Kinda ugly, but it keeps things within React/Redux conventions

  return Object.entries(actions).reduce((sum, [key, action]) => {
    sum[key] = (...args) => {
      const actionJSON = JSON.stringify(action.apply(null, args));
      console.log('actionObj', actionJSON);
      _socket.send(actionJSON);
    };
    return sum;
  }, {});
}

export function openSocketConnection({ port }) {
  if (_socket && _socket.state) null; // TODO: Prevent attempting to re-open an open socket

  // Compute host
  let host = location.origin;
  host = host.slice(host.indexOf('://') + 3, host.length);
  if (host.indexOf(':') !== -1) {
    host = host.slice(0, host.indexOf(':'));
  }
  host = 'ws://' + host + ':' + port;

  // FIRE IT UP
  _socket = window.socket = new WebSocket(host);
  _socket.onopen = () => {
    console.log('*** Socket open');
    // TODO: Request treeState
  };
  _socket.onmessage = message => {
    console.log('=== MESSAGE ===');
    console.log(message);
    _dispatch(JSON.parse(message.data));
  };

  _socket.onclose = function() {
    console.log('*** Socket closed');
  };
}
