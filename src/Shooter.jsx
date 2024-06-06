import React from 'react';

const Shooter = ({ position }) => {
  return <div className="shooter" style={{ left: `${position}%` }}></div>;
};

export default Shooter;
