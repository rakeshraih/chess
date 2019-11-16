const swapPawnPosition = (dragItem, data, board) => {
  const [i, j] = data.position;
  const [m, n] = dragItem.position;
  console.log('drop', i, j, m, n);
  const boardItem = { ...board[m][n] };
  if (dragItem.name === 'pawn') {
    console.log(dragItem);
    if (dragItem.firstMove) {
      if (dragItem.color === 'black') {
        if ((i + 1 === m || i + 2 === m) && j === n && !data.name) {
          swap(board, boardItem, i, j, m, n);
        }
      } else {
        if ((i - 1 === m || i - 2 === m) && j === n && !data.name) {
          swap(board, boardItem, i, j, m, n);
        }
      }

      dragItem.firstMove = false;
    } else {
      if (dragItem.color === 'black') {
        if (i + 1 === m && j === n && !data.name) {
          swap(board, boardItem, i, j, m, n);
        }
      } else {
        if (i - 1 === m && j === n && !data.name) {
          swap(board, boardItem, i, j, m, n);
        }
      }
    }
  }
  return board;
};

const swap = (board, boardItem, i, j, m, n) => {
  board[i][j] = boardItem;
  board[m][n] = null;
  return board;
};

export { swapPawnPosition };
