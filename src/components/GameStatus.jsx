import React from 'react';

export const GameStatusDisplay = ({ status, winner, currentPlayer }) => {
  let message, colorClass, icon;
  if (status === 'won') {
    message = (
      <span>
        <span className="font-bold animate-bounce">Winner: {winner} 🏆</span>
      </span>
    );
    colorClass = 'text-yellow-500';
    icon = '🏆';
  } else if (status === 'draw') {
    message = <span className="font-bold">It's a Draw! 🤝</span>;
    colorClass = 'text-gray-600';
    icon = '🤝';
  } else {
    message = (
      <span>
        <span className={currentPlayer === 'X' ? 'text-blue-600' : 'text-pink-500'}>
          {currentPlayer}
        </span>
        <span className="ml-2 font-semibold">'s turn</span> <span className="ml-1">{currentPlayer === 'X' ? '❌' : '⭕'}</span>
      </span>
    );
    colorClass = currentPlayer === 'X' ? 'text-blue-600' : 'text-pink-500';
    icon = currentPlayer === 'X' ? '❌' : '⭕';
  }

  return (
    <div className={`text-2xl md:text-3xl font-bold mb-6 flex items-center justify-center gap-2 ${colorClass}`}>
      {icon} {message}
    </div>
  );
};