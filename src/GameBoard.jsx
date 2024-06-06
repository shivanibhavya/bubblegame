import React, { useEffect } from 'react';
import Bubble from './Bubble';
import Shooter from './Shooter';

const GameBoard = ({ bubbles, shooterPosition, shootingBubble, handleKeyPress, score, gameOver }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div className="game-board">
      <div className="score">Score: {score}</div>
      {gameOver && <div className="game-over">Game Over</div>}
      {bubbles.map((bubble) => (
        <Bubble key={bubble.id} color={bubble.color} x={bubble.x} y={bubble.y} />
      ))}
      {shootingBubble && (
        <Bubble color={shootingBubble.color} x={shootingBubble.x} y={shootingBubble.y} />
      )}
      <Shooter position={shooterPosition} />
    </div>
  );
};

export default GameBoard;
