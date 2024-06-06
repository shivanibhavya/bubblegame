import React, { useState, useEffect } from 'react';
import './App.css';
import GameBoard from './GameBoard';

function App() {
  const [bubbles, setBubbles] = useState([]);
  const [shooterPosition, setShooterPosition] = useState(50);
  const [shootingBubble, setShootingBubble] = useState(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const initialBubbles = generateBubbles(10);
    setBubbles(initialBubbles);
  }, []);

  const generateBubbles = (num) => {
    const colors = ['red', 'blue', 'green', 'yellow', 'purple'];
    let bubblesArray = [];
    for (let i = 0; i < num; i++) {
      bubblesArray.push({
        id: i,
        color: colors[Math.floor(Math.random() * colors.length)],
        x: Math.random() * 90,
        y: Math.random() * 90,
      });
    }
    return bubblesArray;
  };

  const handleKeyPress = (e) => {
    if (e.key === 'ArrowLeft' && shooterPosition > 0) {
      setShooterPosition(shooterPosition - 5);
    } else if (e.key === 'ArrowRight' && shooterPosition < 100) {
      setShooterPosition(shooterPosition + 5);
    } else if (e.key === ' ') {
      shootBubble();
    }
  };

  const shootBubble = () => {
    if (!shootingBubble) {
      setShootingBubble({
        id: Date.now(),
        color: 'black',
        x: shooterPosition,
        y: 90,
      });
    }
  };

  const checkCollision = (bubble1, bubble2) => {
    const dx = bubble1.x - bubble2.x;
    const dy = bubble1.y - bubble2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < 50; // Assuming bubble diameter is 50
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [shooterPosition, shootingBubble]);

  useEffect(() => {
    if (shootingBubble) {
      const interval = setInterval(() => {
        setShootingBubble((prevBubble) => {
          if (prevBubble.y <= 0) {
            clearInterval(interval);
            setGameOver(true);
            return null;
          }

          const hitBubble = bubbles.find((bubble) =>
            checkCollision(prevBubble, bubble)
          );

          if (hitBubble) {
            clearInterval(interval);
            setBubbles((prevBubbles) =>
              prevBubbles.filter((bubble) => bubble.id !== hitBubble.id)
            );
            setScore((prevScore) => prevScore + 10);
            return null;
          }

          return { ...prevBubble, y: prevBubble.y - 1 };
        });
      }, 10);
      return () => clearInterval(interval);
    }
  }, [shootingBubble, bubbles]);

  return (
    <GameBoard
      bubbles={bubbles}
      shooterPosition={shooterPosition}
      shootingBubble={shootingBubble}
      handleKeyPress={handleKeyPress}
      score={score}
      gameOver={gameOver}
    />
  );
}

export default App;
