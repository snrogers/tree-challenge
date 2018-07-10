import React from 'react';

import { Tree } from './tree';

const mockTreeState = [
  { id: 0, name: 'First Factory', children: [1, 2, 3, 4, 5] },
  { id: 1, name: 'Second', children: [2, 4, 6, 8, 10] },
  { id: 2, name: 'Third', children: [3, 6, 9, 12, 15] }
];

export const App = () => (
  <div className="container">
    <h1>Tree Challenge</h1>
    <Tree treeState={mockTreeState} />
  </div>
);
