import React from 'react';

const Bubble = ({ color, x, y }) => {
  return (
    <div
      className="bubble"
      style={{ backgroundColor: color, left: `${x}%`, top: `${y}%` }}
    ></div>
  );
};

export default Bubble;
