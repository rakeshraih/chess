import React from 'react';
import Board from './components/Board';

import './App.css';

function App() {
  return (
    <div className="App">
      <Board board={new Array(8).fill(null).map(() => new Array(8).fill(null))}></Board>
    </div>
  );
}

export default App;
