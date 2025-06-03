import React from 'react';
import { Square } from './Square';

function getWinningLine(squares, winner) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  if (!winner) return [];
  return lines.find(line =>
    line.every(idx => squares[idx] === winner)
  ) || [];
}

export const Board = ({ squares, onSquareClick, winner, gameStarted }) => {
  const winningLine = getWinningLine(squares, winner);
  
  return (
    <div className={`grid grid-cols-3 gap-3 mb-4 ${gameStarted ? 'animate-pop-in' : ''}`}>
      {squares.map((square, index) => (
        <Square
          key={index}
          value={square}
          onClick={() => onSquareClick(index)}
          highlight={winningLine.includes(index)}
          gameStarted={gameStarted}
          index={index}
        />
      ))}
    </div>
  );
};