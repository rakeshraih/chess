import React from 'react';
import './index.scss';

function Element(props) {
  const { item } = props;
  const { className } = item ? item : {};
  const { drag, drop, allowDrop } = props.drop;
  return (
    <div onDrop={event => drop(event, item)} onDragOver={event => allowDrop(event, item)}>
      {className ? <i draggable onDragStart={event => drag(event, item)} className={`fas ${className}`}></i> : ''}
    </div>
  );
}

export default Element;
