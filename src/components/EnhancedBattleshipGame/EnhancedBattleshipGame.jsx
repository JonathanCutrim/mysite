import React, { useState, useEffect } from 'react';
import Battleship from '../Battleship/Battleship';
import ImprovedGameModeSelector from '../ImprovedGameModeSelector/ImprovedGameModeSelector';

const EnhancedBattleshipGame = ({ theme = 'black', onBack }) => {
  const [gameState, setGameState] = useState('select-mode'); // select-mode, computer, online
  const [animating, setAnimating] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  // Handle game mode selection
  const handleSelectMode = (mode) => {
    setAnimating(true);
    setLoadingProgress(0);
    
    // Simulate loading
    const loadInterval = setInterval(() => {
      setLoadingProgress(prev => {
        const newValue = prev + Math.floor(Math.random() * 5) + 3;
        if (newValue >= 100) {
          clearInterval(loadInterval);
          
          // When loading reaches 100%, switch to game mode
          setTimeout(() => {
            setGameState(mode);
            setAnimating(false);
          }, 300);
          
          return 100;
        }
        return newValue;
      });
    }, 50);
  };
  
  // Handle back button from game to mode selection
  const handleBackToModeSelect = () => {
    setAnimating(true);
    
    setTimeout(() => {
      setGameState('select-mode');
      setAnimating(false);
    }, 400);
  };
  
  // Get theme-specific styles
  const getThemeStyles = () => {
    switch (theme) {
      case 'cyberpunk':
        return {
          loadingBar: 'bg-pink-900',
          loadingFill: 'bg-cyan-500',
          loadingText: 'text-cyan-300',
          backButton: 'bg-pink-800 text-cyan-300 hover:bg-pink-700',
          overlay: 'bg-purple-900/90',
          glowEffect: '0 0 15px rgba(6, 182, 212, 0.5)'
        };
      case 'white':
        return {
          loadingBar: 'bg-gray-200',
          loadingFill: 'bg-blue-600',
          loadingText: 'text-gray-800',
          backButton: 'bg-gray-200 text-gray-700 hover:bg-gray-300',
          overlay: 'bg-white/90',
          glowEffect: 'none'
        };
      case 'black':
      default:
        return {
          loadingBar: 'bg-gray-800',
          loadingFill: 'bg-blue-500',
          loadingText: 'text-gray-300',
          backButton: 'bg-gray-800 text-white hover:bg-gray-700',
          overlay: 'bg-black/90',
          glowEffect: 'none'
        };
    }
  };
  
  const styles = getThemeStyles();
  
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Loading overlay - shown during transitions */}
      {animating && (
        <div className={`absolute inset-0 z-50 flex flex-col items-center justify-center ${styles.overlay} transition-opacity duration-300`}>
          <div className="text-center max-w-md px-4">
            <h3 className={`text-xl font-bold mb-4 ${styles.loadingText}`}>
              {loadingProgress < 100 ? 'Initializing Combat System...' : 'System Ready'}
            </h3>
            
            <div className={`w-full h-2 ${styles.loadingBar} rounded-full overflow-hidden mb-2`}>
              <div 
                className={`h-full ${styles.loadingFill} transition-all duration-200`}
                style={{ 
                  width: `${loadingProgress}%`,
                  boxShadow: theme === 'cyberpunk' ? styles.glowEffect : 'none'
                }}
              ></div>
            </div>
            
            <p className={`text-sm ${styles.loadingText}`}>
              {loadingProgress < 30 ? 'Loading assets...' : 
               loadingProgress < 60 ? 'Calibrating weapons systems...' : 
               loadingProgress < 90 ? 'Establishing tactical grid...' : 
               'Combat ready.'}
            </p>
          </div>
        </div>
      )}
      
      {/* Mode selection screen */}
      <div 
        className={`absolute inset-0 transition-all duration-400 ${
          gameState !== 'select-mode' ? 'opacity-0 pointer-events-none transform translate-y-10' : 'opacity-100'
        }`}
      >
        <ImprovedGameModeSelector 
          theme={theme} 
          onSelectMode={handleSelectMode}
          onBack={onBack}
        />
      </div>
      
      {/* Battleship game - Computer mode */}
      <div 
        className={`absolute inset-0 transition-all duration-400 ${
          gameState !== 'computer' ? 'opacity-0 pointer-events-none transform -translate-y-10' : 'opacity-100'
        }`}
      >
        {gameState === 'computer' && (
          <div className="w-full h-full">
            <div className="absolute top-4 left-4 z-40">
              <button 
                onClick={handleBackToModeSelect}
                className={`px-3 py-1 rounded-md flex items-center gap-2 text-sm ${styles.backButton}`}
              >
                ← Back to Menu
              </button>
            </div>
            <Battleship theme={theme} isExpanded={true} />
          </div>
        )}
      </div>
      
      {/* Battleship game - Online mode */}
      <div 
        className={`absolute inset-0 transition-all duration-400 ${
          gameState !== 'online' ? 'opacity-0 pointer-events-none transform translate-y-10' : 'opacity-100'
        }`}
      >
        {gameState === 'online' && (
          <div className="w-full h-full">
            <div className="absolute top-4 left-4 z-40">
              <button 
                onClick={handleBackToModeSelect}
                className={`px-3 py-1 rounded-md flex items-center gap-2 text-sm ${styles.backButton}`}
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

export default EnhancedBattleshipGame;