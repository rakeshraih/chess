import React from 'react';
import Box from '../Box';
import './index.scss';

const King = {
  moves: [],
  className: 'fa-chess-king',
  name: 'king',
  firstMove: true,
};

const Queen = {
  moves: [],
  className: 'fa-chess-queen',
  name: 'queen',
  firstMove: true,
};

const Bishop = {
  moves: [],
  className: 'fa-chess-bishop',
  name: 'bishop',
  firstMove: true,
};

const Knight = {
  moves: [],
  className: 'fa-chess-knight',
  name: 'knight',
  firstMove: true,
};

const Rook = {
  moves: [],
  className: 'fa-chess-rook',
  name: 'rook',
  firstMove: true,
};

const Pawn = {
  moves: [],
  className: 'fa-chess-pawn',
  name: 'pawn',
  firstMove: true,
};

const addKing = board => {
  let pawnNew = { ...King };
  pawnNew.className = `${pawnNew.className} white`;
  pawnNew.initial = [0, 4];
  board[0][4] = pawnNew;

  pawnNew = { ...King };
  pawnNew.className = `${pawnNew.className} black`;
  pawnNew.initial = [7, 4];
  board[7][4] = pawnNew;
  return board;
};

const addQueen = board => {
  let pawnNew = { ...Queen };
  pawnNew.className = `${pawnNew.className} white`;
  pawnNew.initial = [0, 3];
  board[0][3] = pawnNew;

  pawnNew = { ...Queen };
  pawnNew.className = `${pawnNew.className} black`;
  pawnNew.initial = [7, 3];
  board[7][3] = pawnNew;
  return board;
};

const allPower = [Rook, Bishop, Knight];

const addAllPower = board => {
  let [i, loop, color] = [0, 1, 'white'];
  while (loop <= 2) {
    allPower.forEach((val, index) => {
      const pawnNew = { ...val };
      pawnNew.className = `${pawnNew.className} ${color}`;
      pawnNew.initial = [i, index];
      pawnNew.color = color;
      board[i][index] = pawnNew;
    });
    i = 7;
    color = 'black';
    loop++;
  }

  [i, loop, color] = [0, 1, 'white'];

  while (loop <= 2) {
    allPower.forEach((val, index) => {
      const pawnNew = { ...val };
      pawnNew.className = `${pawnNew.className} ${color}`;
      pawnNew.initial = [i, 7 - index];
      pawnNew.color = color;
      board[i][7 - index] = pawnNew;
    });
    i = 7;
    color = 'black';
    loop++;
  }

  return board;
};
const addPawns = board => {
  let j = 0;
  let i = 1;
  while (j < 8) {
    const pawnNew = { ...Pawn };
    pawnNew.className = `${pawnNew.className} white`;
    pawnNew.initial = [i, j];
    pawnNew.color = 'white';
    board[i][j] = pawnNew;
    j++;
  }
  j = 0;
  i = 6;
  while (j < 8) {
    const pawnNew = { ...Pawn };
    pawnNew.className = `${pawnNew.className} black`;
    pawnNew.initial = [i, j];
    pawnNew.color = 'black';
    board[6][j] = pawnNew;
    j++;
  }

  return addAllPower(addQueen(addKing(board)));
};

class Board extends React.Component {
  drop = data => {
    console.log(data);
  };
  render() {
    return (
      <div className="App">
        <Box drop={this.drop} board={addPawns(this.props.board)}></Box>
      </div>
    );
  }
}

export default Board;
