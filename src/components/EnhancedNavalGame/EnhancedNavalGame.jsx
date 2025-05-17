import React, { useState } from 'react';
import ImprovedNavalCombat from '../ImprovedNavalCombat/ImprovedNavalCombat';
import SimplifiedGameModeSelector from '../SimplifiedGameModeSelector/SimplifiedGameModeSelector';
import Battleship from '../Battleship/Battleship';

const EnhancedNavalGame = ({ theme = 'black', onBack }) => {
  const [gameState, setGameState] = useState('preview'); // preview, select-mode, playing
  const [gameMode, setGameMode] = useState(null); // computer, online
  const [animating, setAnimating] = useState(false);
  
  // Handle preview click to go to mode selection
  const handleOpenGame = () => {
    setAnimating(true);
    
    setTimeout(() => {
      setGameState('select-mode');
      setAnimating(false);
    }, 400);
  };
  
  // Handle game mode selection
  const handleSelectMode = (mode) => {
    setAnimating(true);
    setGameMode(mode);
    
    setTimeout(() => {
      setGameState('playing');
      setAnimating(false);
    }, 500);
  };
  
  // Handle back button from mode selection to preview
  const handleBackToPreview = () => {
    setAnimating(true);
    
    setTimeout(() => {
      setGameState('preview');
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
      {/* Loading overlay - shown during transitions */}
      {animating && (
        <div className={`absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 transition-opacity duration-300`}>
          <div className="w-16 h-16 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Preview mode - shows the compact game preview */}
      <div 
        className={`absolute inset-0 transition-all duration-400 ${
          gameState !== 'preview' ? 'opacity-0 pointer-events-none transform translate-y-10' : 'opacity-100'
        }`}
      >
        <div className="w-full h-full p-6 flex items-center justify-center">
          <div className="w-full max-w-md transition-transform duration-300 hover:scale-105">
            <ImprovedNavalCombat 
              theme={theme} 
              onClick={handleOpenGame}
            />
          </div>
        </div>
      </div>
      
      {/* Mode Selection */}
      <div 
        className={`absolute inset-0 transition-all duration-400 ${
          gameState !== 'select-mode' ? 'opacity-0 pointer-events-none transform translate-y-10' : 'opacity-100'
        }`}
      >
        {gameState === 'select-mode' && (
          <SimplifiedGameModeSelector 
            theme={theme} 
            onSelectMode={handleSelectMode}
            onBack={handleBackToPreview}
          />
        )}
      </div>
      
      {/* Game Playing */}
      <div 
        className={`absolute inset-0 transition-all duration-400 ${
          gameState !== 'playing' ? 'opacity-0 pointer-events-none transform translate-y-10' : 'opacity-100'
        }`}
      >
        {gameState === 'playing' && (
          <div className="w-full h-full">
            <div className="absolute top-4 left-4 z-40">
              <button 
                onClick={handleBackToModeSelect}
                className={`px-3 py-1 rounded-md flex items-center gap-2 text-sm ${
                  theme === 'cyberpunk' 
                    ? 'bg-pink-800 text-cyan-300 hover:bg-pink-700' 
                    : theme === 'black'
                      ? 'bg-gray-800 text-white hover:bg-gray-700'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                ← Back to Menu
              </button>
            </div>
            <Battleship theme={theme} isExpanded={true} />
          </div>
        )}
      </div>
      
      {/* Optional scanlines effect */}
      {theme !== 'white' && (
        <div 
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            backgroundImage: 'linear-gradient(transparent 50%, rgba(255, 255, 255, 0.025) 50%)',
            backgroundSize: '100% 4px',
            opacity: theme === 'cyberpunk' ? 0.2 : 0.1
          }}
        ></div>
      )}
    </div>
  );
};

export default EnhancedNavalGame;