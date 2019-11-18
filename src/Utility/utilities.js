let updateRemoveElementsFn = null;
const validatePawnPosition = (dragItem, data, board, boardItem, i, j, m, n) => {
  if (dragItem.firstMove) {
    boardItem.firstMove = false;

    if (dragItem.color === 'black') {
      if ((i + 1 === m || i + 2 === m) && j === n && !data.name) {
        swap(board, boardItem, i, j, m, n);
      }
    } else {
      if ((i - 1 === m || i - 2 === m) && j === n && !data.name) {
        swap(board, boardItem, i, j, m, n);
      }
    }
  } else {
    if (dragItem.color === 'black') {
      console.log('Test-1', data.name, data.color, i, m, j, n);
      if (
        (i + 1 === m && j === n && !data.name) ||
        (data.name && data.color === 'white' && i + 1 === m && (j - 1 === n || j + 1 === n))
      ) {
        swap(board, boardItem, i, j, m, n);
      }
    } else {
      if (
        (i - 1 === m && j === n && !data.name) ||
        (data.name && data.color === 'black' && i - 1 === m && (j - 1 === n || j + 1 === n))
      ) {
        swap(board, boardItem, i, j, m, n);
      }
    }
  }

  return board;
};
const rookValidator = (dragItem, data, board, boardItem, i, j, m, n) => {
  boardItem.firstMove = false;
  const axis = i === m ? 'n' : 'm';
  let noElementsBefore = true;
  let index = i > m ? i - 1 : i + 1;
  if (axis === 'm') {
    while (index !== m) {
      if (board[index][n]) {
        noElementsBefore = false;
        break;
      }
      index = i > m ? index - 1 : index + 1;
    }
  } else {
    index = j > n ? j - 1 : j + 1;
    while (index !== n) {
      if (board[m][index]) {
        noElementsBefore = false;
        break;
      }
      index = j > n ? index - 1 : index + 1;
    }
  }

  return noElementsBefore && ((i === m && j !== n) || (i !== m && j === n));
};
const validateRookPosition = (dragItem, data, board, boardItem, i, j, m, n) => {
  if (rookValidator(dragItem, data, board, boardItem, i, j, m, n)) {
    swap(board, boardItem, i, j, m, n);
  }
  return board;
};

const validateKnightPosition = (dragItem, data, board, boardItem, i, j, m, n) => {
  console.log(i, j, m, n);
  if (
    (i + 2 === m && j + 1 === n) ||
    (i + 1 === m && j + 2 === n) ||
    (i - 2 === m && j - 1 === n) ||
    (i - 1 === m && j - 2 === n) ||
    (i - 2 === m && j + 1 === n) ||
    (i + 2 === m && j - 1 === n) ||
    (i + 1 === m && j - 2 === n) ||
    (i - 1 === m && j + 2 === n)
  ) {
    swap(board, boardItem, i, j, m, n);
  }
  return board;
};

const validateKingPosition = (dragItem, data, board, boardItem, i, j, m, n) => {
  if (
    (i === m && j + 1 === n) ||
    (i + 1 === m && j === n) ||
    (i + 1 === m && j + 1 === n) ||
    (i - 1 === m && j - 1 === n) ||
    (i === m && j - 1 === n) ||
    (i - 1 === m && j === n) ||
    (i + 1 === m && j - 1 === n) ||
    (i - 1 === m && j + 1 === n)
  ) {
    swap(board, boardItem, i, j, m, n);
  }
  return board;
};

const bishopValidator = (dragItem, data, board, boardItem, i, j, m, n) => {
  let noElementsBefore = true;
  let mindex = m < i ? m + 1 : m - 1;
  let nindex = n < j ? n + 1 : n - 1;

  while (mindex !== i && nindex !== j) {
    console.log(mindex, nindex, board[mindex][nindex]);

    if (board[mindex][nindex]) {
      noElementsBefore = false;
      break;
    }
    mindex = m < i ? mindex + 1 : mindex - 1;
    nindex = n < j ? nindex + 1 : nindex - 1;
  }

  return noElementsBefore && Math.abs(m - i) === Math.abs(n - j);
};
const validateBishopPosition = (dragItem, data, board, boardItem, i, j, m, n) => {
  if (bishopValidator(dragItem, data, board, boardItem, i, j, m, n)) {
    swap(board, boardItem, i, j, m, n);
  }
  return board;
};

const validateQueenPosition = (dragItem, data, board, boardItem, i, j, m, n) => {
  if (
    bishopValidator(dragItem, data, board, boardItem, i, j, m, n) ||
    rookValidator(dragItem, data, board, boardItem, i, j, m, n)
  ) {
    swap(board, boardItem, i, j, m, n);
  }
  return board;
};

const swapPawnPosition = (dragItem, data, board, updateRemoveElements) => {
  const [i, j] = data.position;
  const [m, n] = dragItem.position;
  console.log('drop', i, j, m, n);
  const boardItem = { ...board[m][n] };
  const fnArgs = [dragItem, data, board, boardItem, i, j, m, n];
  updateRemoveElementsFn = updateRemoveElements;
  switch (dragItem.name) {
    case 'pawn':
      validatePawnPosition(...fnArgs);
      break;
    case 'rook':
      validateRookPosition(...fnArgs);
      break;
    case 'knight':
      validateKnightPosition(...fnArgs);
      break;
    case 'bishop':
      validateBishopPosition(...fnArgs);
      break;
    case 'king':
      validateKingPosition(...fnArgs);
      break;
    case 'queen':
      validateQueenPosition(...fnArgs);
      break;
    default:
      break;
  }
  return board;
};

const swap = (board, boardItem, i, j, m, n) => {
  if (boardItem.color(board[i][j] ? board[i][j].color : null)) {
    updateRemoveElementsFn(board[i][j]);
    board[i][j] = boardItem;
    board[m][n] = null;
  }

  return board;
};

export { swapPawnPosition };
