import React, { useState, useEffect } from 'react';
import Battleship  from '../../components/Battleship/Battleship';
import GameModeSelector from '../../components/GameModeSelector/GameModeSelector';

const EnhancedBattleshipGame = ({ theme = 'black', onBack }) => {
  const [gameState, setGameState] = useState('select-mode'); // select-mode, computer, online
  const [animating, setAnimating] = useState(false);
  
  // Handle game mode selection
  const handleSelectMode = (mode) => {
    setAnimating(true);
    
    setTimeout(() => {
      setGameState(mode);
      setAnimating(false);
    }, 400);
  };
  
  // Handle back button from game to mode selection
  const handleBackToModeSelect = () => {
    setAnimating(true);
    
    setTimeout(() => {
      setGameState('select-mode');
      setAnimating(false);
    }, 400);
  };
  
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Transition overlay */}
      <div 
        className={`absolute inset-0 z-50 bg-black transition-opacity duration-400 pointer-events-none ${
          animating ? 'opacity-100' : 'opacity-0'
        }`}
      ></div>
      
      {/* Mode selection screen */}
      <div 
        className={`absolute inset-0 transition-all duration-400 ${
          gameState !== 'select-mode' ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <GameModeSelector 
          theme={theme} 
          onSelectMode={handleSelectMode}
          onBack={onBack}
        />
      </div>
      
      {/* Battleship game - Computer mode */}
      <div 
        className={`absolute inset-0 transition-all duration-400 ${
          gameState !== 'computer' ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        {gameState === 'computer' && (
          <div className="w-full h-full">
            <div className="absolute top-4 left-4 z-40">
              <button 
                onClick={handleBackToModeSelect}
                className={`px-3 py-1 rounded-md flex items-center ${
                  theme === 'cyberpunk' 
                    ? 'bg-pink-800 text-cyan-300 hover:bg-pink-700' 
                    : theme === 'black'
                      ? 'bg-gray-800 text-white hover:bg-gray-700' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <span className="text-sm">← Back to Menu</span>
              </button>
            </div>
            <Battleship theme={theme} isExpanded={true} />
          </div>
        )}
      </div>
      
      {/* Battleship game - Online mode */}
      <div 
        className={`absolute inset-0 transition-all duration-400 ${
          gameState !== 'online' ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        {gameState === 'online' && (
          <div className="w-full h-full">
            <div className="absolute top-4 left-4 z-40">
              <button 
                onClick={handleBackToModeSelect}
                className={`px-3 py-1 rounded-md flex items-center ${
                  theme === 'cyberpunk' 
                    ? 'bg-pink-800 text-cyan-300 hover:bg-pink-700' 
                    : theme === 'black'
                      ? 'bg-gray-800 text-white hover:bg-gray-700' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <span className="text-sm">← Back to Menu</span>
              </button>
            </div>
            <Battleship theme={theme} isExpanded={true} />
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedBattleshipGame;