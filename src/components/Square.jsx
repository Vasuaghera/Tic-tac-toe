import React from 'react';

export const Square = ({ value, onClick, highlight, gameStarted, index }) => {
  const getAnimationDelay = () => {
    const row = Math.floor(index / 3);
    const col = index % 3;
    return `${(row * 3 + col) * 0.1}s`;
  };

  return (
    <button
      onClick={onClick}
      className={`w-24 h-24 md:w-28 md:h-28 border-2 border-white/60 rounded-2xl text-5xl md:text-6xl font-extrabold flex items-center justify-center shadow-lg transition-all duration-200
        ${highlight ? 'bg-gradient-to-br from-yellow-300 to-pink-400 scale-110 animate-pulse text-white border-yellow-400' : 'bg-white/70 hover:bg-blue-100 active:scale-95'}
        ${value === 'X' ? 'text-blue-600' : value === 'O' ? 'text-pink-500' : 'text-gray-400'}`}
      style={{ 
        boxShadow: highlight ? '0 0 24px 4px #fbbf24' : undefined,
        animationDelay: gameStarted ? getAnimationDelay() : '0s',
        animation: gameStarted ? 'popIn 0.3s ease-out forwards' : 'none',
        opacity: gameStarted ? 1 : 0
      }}
      disabled={!!value || highlight}
    >
      {value}
    </button>
  );
};