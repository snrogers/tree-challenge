import React from 'react';
import ReactDom from 'react-dom';

import { App } from './client/app';

const appNode = document.querySelector('#app');

ReactDom.render(<App />, appNode);
