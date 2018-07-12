import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { render } from 'react-dom';

import { App } from '#client/app';
import { openSocketConnection } from '#client/socket';
import { rootReducer } from '#client/reducers';

const store = createStore(rootReducer);

openSocketConnection();

// Render
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#app')
);
