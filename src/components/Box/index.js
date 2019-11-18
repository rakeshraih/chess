import React from 'react';
import './index.scss';
import Pawn from '../Pawn';
import { swapPawnPosition } from '../../Utility/utilities';

const drawRowElement = (board, drop) => {
  const { length } = board;
  const trs = [];
  for (let i = 0; i < length; i++) {
    const tds = [];
    for (let j = 0; j < length; j++) {
      const evenOdd = i % 2 === j % 2;
      const item = board[i][j] || {};
      item.position = [i, j];
      tds.push(
        <td key={`${i}-${j}`} className={evenOdd ? '' : 'evenOdd'} data-index={`${i}-${j}`}>
          <Pawn {...{ drop }} item={item}></Pawn>
        </td>,
      );
    }
    trs.push(<tr key={`${i}`}>{tds}</tr>);
  }
  return trs;
};
class Box extends React.Component {
  constructor(props) {
    super(props);
    this.dragItem = null;
    this.lastMove = false;
    this.state = {
      board: this.props.board,
      rotate: true,
      removeElements: [],
    };
  }

  componentDidMount() {}

  updateRemoveElements = element => {
    const { removeElements } = this.state;
    if (element && element.name) {
      this.setState({ removeElements: [...removeElements, element] });
    }
  };
  drop = (event, data = {}) => {
    console.log('drop', data);
    const arrayString = JSON.stringify(this.state.board);
    if ((this.dragItem.color === 'black' && this.lastMove) || (this.dragItem.color === 'white' && !this.lastMove)) {
      const board = swapPawnPosition(this.dragItem, data, this.state.board, this.updateRemoveElements);
      this.setState({ board });
      if (arrayString !== JSON.stringify(board)) {
        this.lastMove = !this.lastMove;
      }
    }
  };
  drag = (event, data) => {
    this.dragItem = data;
    // console.log('drag', data);
  };

  allowDrop = e => {
    e.preventDefault();
    // console.log('allowDrop', data);
  };

  render() {
    const { rotate, removeElements } = this.state;
    return (
      <div className="main-container">
        <h2>{!this.lastMove ? 'White' : 'Black'} to move</h2>
        <i
          role="button"
          onClick={() => {
            this.setState({ rotate: !rotate });
          }}
          className="fas fa-exchange-alt"
        ></i>
        <div className="removed-container white">
          {removeElements.map(val => (val.color === 'white' ? <i className={`fas ${val.className}`}></i> : ''))}
        </div>
        <table className={`${!this.lastMove ? 'white' : 'black'} ${this.state.rotate ? 'rotate' : ''}`}>
          <tbody>
            {drawRowElement(this.props.board, { drop: this.drop, allowDrop: this.allowDrop, drag: this.drag })}
          </tbody>
        </table>
        <div className="removed-container black">
          {removeElements.map(val => (val.color === 'black' ? <i className={`fas ${val.className}`}></i> : ''))}
        </div>
      </div>
    );
  }
}
export default Box;
