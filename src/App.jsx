import React, { useState, useEffect } from 'react';
import { Board } from './components/Board';
import { GameStatusDisplay } from './components/GameStatus';
import { checkWinner, isBoardFull } from './utils/gameLogic';
import { RotateCcw } from 'lucide-react';

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [gameStarted, setGameStarted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const winner = checkWinner(board);
  const isDraw = !winner && isBoardFull(board);
  const gameStatus = winner ? 'won' : isDraw ? 'draw' : 'playing';

  useEffect(() => {
    // Start game animation
    setGameStarted(true);
  }, []);

  useEffect(() => {
    // Show confetti when game ends (win or draw)
    if (winner || isDraw) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [winner, isDraw]);

  const handleSquareClick = (index) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setShowConfetti(false);
  };

  const renderConfetti = () => {
    if (!showConfetti) return null;
    return Array.from({ length: 50 }).map((_, i) => (
      <div
        key={i}
        className="confetti"
        style={{
          left: `${Math.random() * 100}vw`,
          top: '-10px',
          transform: `rotate(${Math.random() * 360}deg)`,
          animationDelay: `${Math.random() * 2}s`,
        }}
      />
    ));
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-pink-300 opacity-30 rounded-full blur-3xl animate-pulse -z-10" style={{filter:'blur(120px)', left:'-10%', top:'-10%'}}></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300 opacity-30 rounded-full blur-3xl animate-pulse -z-10" style={{filter:'blur(120px)', right:'-10%', bottom:'-10%'}}></div>
      
      {/* Confetti */}
      {renderConfetti()}

      <div className={`bg-white/30 backdrop-blur-lg shadow-2xl rounded-3xl p-10 max-w-md w-full flex flex-col items-center border border-white/40 ${gameStarted ? 'animate-slide-in' : ''}`}>
        <h1 className={`text-4xl font-extrabold text-gray-900 mb-2 tracking-tight drop-shadow-lg flex items-center gap-2 ${gameStarted ? 'animate-pop-in' : ''}`}>
          <span role="img" aria-label="Tic Tac Toe">🎮</span> Tic-Tac-Toe
        </h1>
        <p className={`text-lg text-gray-700 mb-6 font-medium ${gameStarted ? 'animate-slide-in' : ''}`}>
          Challenge your friend or yourself!
        </p>
        
        <GameStatusDisplay
          status={gameStatus}
          winner={winner}
          currentPlayer={currentPlayer}
        />

        <Board 
          squares={board} 
          onSquareClick={handleSquareClick} 
          winner={winner}
          gameStarted={gameStarted}
        />
        
        <button
          onClick={resetGame}
          className="mt-8 w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-pink-500 text-white rounded-xl font-bold text-lg shadow-lg hover:scale-105 hover:from-pink-500 hover:to-blue-500 transition-all duration-300 flex items-center justify-center gap-2"
        >
          <RotateCcw size={22} />
          Reset Game
        </button>
      </div>
    </div>
  );
}

export default App;