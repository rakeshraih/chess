import React from 'react';
import Board from './components/Board';

import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Work in progress</h1>
      <Board board={new Array(8).fill(null).map(() => new Array(8).fill(null))}></Board>
    </div>
  );
}

export default App;
