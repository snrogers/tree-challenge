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
        console.log('REMOTE', actionObj);
        const actionJSON = JSON.stringify(actionObj);
        _socket.send(actionJSON);
      } else {
        console.log('LOCAL', actionObj);
        _dispatch(actionObj);
      }
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
  _socket.onopen = () => {};

  _socket.onmessage = message => {
    console.log('=== MESSAGE ===');
    console.log(message);
    _dispatch(JSON.parse(message.data));
  };

  _socket.onclose = function() {
    openSocketConnection({ port });
  };
}
