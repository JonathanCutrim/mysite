import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, Gamepad2, Globe, Monitor, Shield, Waves, Crosshair, AlertTriangle } from 'lucide-react';

const ImprovedGameModeSelector = ({ theme = 'black', onSelectMode, onBack }) => {
  const [hoverMode, setHoverMode] = useState(null);
  const [wavePosition, setWavePosition] = useState(0);
  const [radarSpin, setRadarSpin] = useState(0);
  const [bubbleVisible, setBubbleVisible] = useState(false);
  const [authorizationLevel, setAuthorizationLevel] = useState(0);
  const [buttonPulse, setButtonPulse] = useState(false);
  
  // Theme-specific styling
  const getThemeStyles = () => {
    switch (theme) {
      case 'cyberpunk':
        return {
          container: 'bg-gradient-to-b from-purple-950 to-purple-900',
          title: 'text-cyan-300',
          subtitle: 'text-pink-300',
          card: 'bg-purple-900/70 border border-pink-600 hover:border-cyan-400',
          cardSelected: 'bg-purple-800/90 border-2 border-cyan-400',
          text: 'text-gray-200',
          highlight: 'text-cyan-300',
          buttonBg: 'bg-pink-700 hover:bg-pink-600',
          buttonText: 'text-cyan-200',
          icon: 'text-cyan-400',
          wave: 'rgba(6, 182, 212, 0.4)',
          scanline: true,
          water: '#0f172a',
          submarine: '#ec4899',
          bubbles: '#06b6d4',
          radar: '#06b6d4',
          scanlineOpacity: 0.3,
          glowEffect: '0 0 15px rgba(6, 182, 212, 0.5)'
        };
      case 'white':
        return {
          container: 'bg-gradient-to-b from-gray-100 to-white',
          title: 'text-gray-800',
          subtitle: 'text-gray-600',
          card: 'bg-white shadow-md border border-gray-200 hover:border-blue-500',
          cardSelected: 'bg-white shadow-lg border-2 border-blue-500',
          text: 'text-gray-600',
          highlight: 'text-blue-600',
          buttonBg: 'bg-blue-500 hover:bg-blue-600',
          buttonText: 'text-white',
          icon: 'text-blue-500',
          wave: 'rgba(59, 130, 246, 0.2)',
          scanline: false,
          water: '#f0f9ff',
          submarine: '#3b82f6',
          bubbles: '#60a5fa',
          radar: '#3b82f6',
          scanlineOpacity: 0.1,
          glowEffect: '0 5px 15px rgba(0, 0, 0, 0.1)'
        };
      case 'black':
      default:
        return {
          container: 'bg-gradient-to-b from-gray-950 to-gray-900',
          title: 'text-white',
          subtitle: 'text-gray-400',
          card: 'bg-gray-800/70 border border-gray-600 hover:border-blue-500',
          cardSelected: 'bg-gray-800/90 border-2 border-blue-500',
          text: 'text-gray-300',
          highlight: 'text-blue-400',
          buttonBg: 'bg-blue-600 hover:bg-blue-500',
          buttonText: 'text-white',
          icon: 'text-blue-400',
          wave: 'rgba(59, 130, 246, 0.3)',
          scanline: true,
          water: '#0f172a',
          submarine: '#60a5fa',
          bubbles: '#93c5fd',
          radar: '#60a5fa',
          scanlineOpacity: 0.2,
          glowEffect: '0 5px 15px rgba(0, 0, 0, 0.3)'
        };
    }
  };
  
  const styles = getThemeStyles();
  
  // Animate waves
  useEffect(() => {
    const interval = setInterval(() => {
      setWavePosition(prev => (prev + 1) % 100);
    }, 50);
    
    // Animate radar
    const radarInterval = setInterval(() => {
      setRadarSpin(prev => prev + 3);
    }, 30);
    
    // Random bubbles
    const bubbleInterval = setInterval(() => {
      setBubbleVisible(prev => !prev);
    }, 2500);
    
    // Authorization progress simulation
    const authInterval = setInterval(() => {
      setAuthorizationLevel(prev => {
        if (prev < 100) {
          const increment = Math.floor(Math.random() * 3) + 1;
          return Math.min(prev + increment, 100);
        }
        return prev;
      });
    }, 150);
    
    return () => {
      clearInterval(interval);
      clearInterval(radarInterval);
      clearInterval(bubbleInterval);
      clearInterval(authInterval);
    };
  }, []);
  
  // Button pulse effect when authorization is complete
  useEffect(() => {
    if (authorizationLevel === 100) {
      setButtonPulse(true);
    }
  }, [authorizationLevel]);
  
  return (
    <div 
      className={`relative w-full h-full flex flex-col items-center justify-center p-6 overflow-hidden ${styles.container}`}
    >
      {/* Back button */}
      <button 
        onClick={onBack}
        className={`absolute top-4 left-4 z-40 flex items-center gap-2 px-3 py-2 rounded-md
          ${styles.text} hover:${styles.highlight} transition-colors duration-200`}
      >
        <ChevronLeft size={18} />
        <span>Back</span>
      </button>
      
      {/* Animated water surface (top waves) */}
      <div className="absolute top-0 left-0 right-0 h-20 overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(
                0deg,
                transparent 0%,
                ${styles.wave} 100%
              )
            `
          }}
        ></div>
        <svg 
          className="absolute top-0 left-0 w-full" 
          style={{ 
            transform: `translateX(-${wavePosition}px)`,
            width: '200%',
            height: '40px'
          }}
          viewBox="0 0 1200 30" 
          preserveAspectRatio="none"
        >
          <path 
            d="M0,30 C100,10 200,30 300,20 C400,10 500,30 600,20 C700,10 800,30 900,20 C1000,10 1100,30 1200,20 L1200,0 L0,0 Z" 
            fill={styles.water}
            opacity="0.3"
          />
        </svg>
        <svg 
          className="absolute top-5 left-0 w-full" 
          style={{ 
            transform: `translateX(-${wavePosition * 0.7}px)`,
            width: '200%',
            height: '40px'
          }}
          viewBox="0 0 1200 30" 
          preserveAspectRatio="none"
        >
          <path 
            d="M0,30 C150,15 300,30 450,20 C600,10 750,25 900,15 C1050,5 1200,20 1350,25 L1350,0 L0,0 Z" 
            fill={styles.water}
            opacity="0.5"
          />
        </svg>
      </div>
      
      {/* Naval elements in the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-40 overflow-hidden">
        {/* Deeper water gradient */}
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(
              180deg,
              transparent 0%,
              ${styles.water} 100%
            )`
          }}
        ></div>
        
        {/* Submarine silhouette */}
        <div 
          className="absolute bottom-5 left-10"
          style={{
            width: '120px',
            height: '40px',
            animation: 'submarineMove 30s linear infinite',
            opacity: 0.5
          }}
        >
          <svg viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M10,20 Q15,10 30,10 L90,10 Q105,10 110,20 Q105,30 90,30 L30,30 Q15,30 10,20 Z" 
              fill={styles.submarine}
              opacity="0.6"
            />
            <circle cx="95" cy="20" r="3" fill={styles.water} />
            <rect x="30" y="5" width="5" height="10" fill={styles.submarine} opacity="0.8" />
          </svg>
          
          {/* Bubbles from submarine */}
          {bubbleVisible && (
            <>
              <div 
                className="absolute -top-6 right-8 rounded-full"
                style={{
                  width: '5px',
                  height: '5px',
                  background: styles.bubbles,
                  animation: 'bubbleRise 4s linear infinite',
                  opacity: 0.7
                }}
              ></div>
              <div 
                className="absolute -top-2 right-12 rounded-full"
                style={{
                  width: '3px',
                  height: '3px',
                  background: styles.bubbles,
                  animation: 'bubbleRise 3s linear infinite',
                  opacity: 0.5,
                  animationDelay: '0.5s'
                }}
              ></div>
              <div 
                className="absolute -top-4 right-16 rounded-full"
                style={{
                  width: '4px',
                  height: '4px',
                  background: styles.bubbles,
                  animation: 'bubbleRise 3.5s linear infinite',
                  opacity: 0.6,
                  animationDelay: '1s'
                }}
              ></div>
            </>
          )}
        </div>
        
        {/* Bottom waves */}
        <svg 
          className="absolute bottom-0 left-0 w-full" 
          style={{ 
            transform: `translateX(-${wavePosition * 0.5}px)`,
            width: '200%',
            height: '20px'
          }}
          viewBox="0 0 1200 20" 
          preserveAspectRatio="none"
        >
          <path 
            d="M0,0 C100,15 200,5 300,10 C400,15 500,5 600,10 C700,15 800,5 900,10 C1000,15 1100,5 1200,10 L1200,20 L0,20 Z" 
            fill={styles.water}
            opacity="0.8"
          />
        </svg>
      </div>
      
      {/* Main Content */}
      <div className="relative z-30 flex flex-col items-center max-w-2xl w-full">
        <div className="mb-10 text-center">
          <div className="flex items-center justify-center mb-2">
            <div 
              className={`relative p-2 rounded-full ${styles.highlight}`}
              style={{
                animation: 'pulse 2s infinite'
              }}
            >
              <Crosshair size={32} className={styles.icon} />
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  border: `2px solid ${styles.highlight}`,
                  opacity: 0.5,
                  animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
                  animationDelay: '0.5s'
                }}
              ></div>
            </div>
          </div>
          <h1 className={`text-3xl sm:text-4xl font-bold mb-3 ${styles.title}`}
            style={{
              textShadow: theme === 'cyberpunk' ? styles.glowEffect : 'none'
            }}
          >
            NAVAL COMBAT SYSTEM
          </h1>
          <p className={`max-w-lg mx-auto ${styles.subtitle}`}>
            TACTICAL GRID COMBAT SIMULATION V2.3.4
          </p>
          
          {/* Authorization progress bar */}
          <div className="mt-5 mb-8 w-full max-w-md mx-auto px-4">
            <div className="flex justify-between text-xs mb-1">
              <span className={styles.text}>SYSTEM AUTHORIZATION</span>
              <span className={styles.highlight}>{authorizationLevel}%</span>
            </div>
            <div className={`w-full h-2 bg-gray-800 rounded-full overflow-hidden`}>
              <div 
                className={`h-full ${theme === 'cyberpunk' ? 'bg-cyan-500' : theme === 'black' ? 'bg-blue-500' : 'bg-blue-600'}`}
                style={{ 
                  width: `${authorizationLevel}%`,
                  transition: 'width 0.3s ease',
                  boxShadow: theme === 'cyberpunk' ? '0 0 10px #06b6d4' : 'none'
                }}
              ></div>
            </div>
            {authorizationLevel < 100 && (
              <p className={`text-xs mt-2 ${styles.subtitle} animate-pulse`}>
                {authorizationLevel < 50 ? 'INITIALIZING SYSTEM...' : 'ESTABLISHING SECURE CONNECTION...'}
              </p>
            )}
          </div>
        </div>
        
        {/* Game Mode Cards - Revealed after authorization complete */}
        <div className={`transition-opacity duration-500 ${authorizationLevel === 100 ? 'opacity-100' : 'opacity-0'}`}>
          <div className="space-y-5 w-full">
            {/* Computer Mode Card */}
            <div 
              className={`p-6 rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-102
                ${hoverMode === 'computer' ? styles.cardSelected : styles.card}
                ${buttonPulse && hoverMode !== 'computer' ? 'animate-pulse' : ''}`}
              onMouseEnter={() => setHoverMode('computer')}
              onMouseLeave={() => setHoverMode(null)}
              onClick={() => authorizationLevel === 100 && onSelectMode && onSelectMode('computer')}
              style={{
                boxShadow: hoverMode === 'computer' ? styles.glowEffect : 'none',
                opacity: authorizationLevel === 100 ? 1 : 0.7,
                pointerEvents: authorizationLevel === 100 ? 'auto' : 'none'
              }}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div 
                    className={`mr-5 p-3 rounded-full flex items-center justify-center ${hoverMode === 'computer' ? styles.buttonBg : 'bg-gray-700/80'}`}
                    style={{
                      boxShadow: theme === 'cyberpunk' && hoverMode === 'computer' ? '0 0 10px rgba(236, 72, 153, 0.5)' : 'none'
                    }}
                  >
                    <Monitor size={24} className={hoverMode === 'computer' ? styles.buttonText : styles.text} />
                  </div>
                  <div>
                    <h3 className={`text-lg font-semibold ${styles.highlight}`}>
                      Local Fleet Simulation
                    </h3>
                    <p className={`text-sm ${styles.text}`}>
                      Challenge the tactical AI in a secure local naval battle
                    </p>
                    <div className={`flex items-center gap-2 mt-2 ${theme === 'cyberpunk' ? 'text-pink-300' : styles.subtitle}`}>
                      <Shield size={14} />
                      <span className="text-xs">SECURE MODE • OFFLINE • NO DATA TRANSMISSION</span>
                    </div>
                  </div>
                </div>
                <ArrowRight size={20} className={styles.highlight} />
              </div>
            </div>
            
            {/* Online Mode Card */}
            <div 
              className={`p-6 rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-102 relative
                ${hoverMode === 'online' ? styles.cardSelected : styles.card}`}
              onMouseEnter={() => setHoverMode('online')}
              onMouseLeave={() => setHoverMode(null)}
              onClick={() => authorizationLevel === 100 && onSelectMode && onSelectMode('online')}
              style={{
                boxShadow: hoverMode === 'online' ? styles.glowEffect : 'none',
                opacity: authorizationLevel === 100 ? 1 : 0.7,
                pointerEvents: authorizationLevel === 100 ? 'auto' : 'none'
              }}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div 
                    className={`mr-5 p-3 rounded-full flex items-center justify-center ${hoverMode === 'online' ? styles.buttonBg : 'bg-gray-700/80'}`}
                    style={{
                      boxShadow: theme === 'cyberpunk' && hoverMode === 'online' ? '0 0 10px rgba(236, 72, 153, 0.5)' : 'none'
                    }}
                  >
                    <Globe size={24} className={hoverMode === 'online' ? styles.buttonText : styles.text} />
                  </div>
                  <div>
                    <h3 className={`text-lg font-semibold ${styles.highlight}`}>
                      Online Multiplayer Combat
                    </h3>
                    <p className={`text-sm ${styles.text}`}>
                      Engage in strategic naval warfare against real opponents
                    </p>
                    <div className={`flex items-center gap-2 mt-2 ${theme === 'cyberpunk' ? 'text-pink-300' : styles.subtitle}`}>
                      <Waves size={14} />
                      <span className="text-xs">ONLINE • P2P ENCRYPTION • ACTIVE MATCHMAKING</span>
                    </div>
                  </div>
                </div>
                <ArrowRight size={20} className={styles.highlight} />
              </div>
              
              {/* "Coming Soon" badge */}
              <div className={`absolute -top-2 -right-2 px-2 py-1 text-xs rounded-md font-bold
                ${theme === 'cyberpunk' ? 'bg-pink-600 text-cyan-300' : 
                theme === 'black' ? 'bg-blue-600 text-white' : 
                'bg-blue-600 text-white'}`}
                style={{
                  boxShadow: theme === 'cyberpunk' ? '0 0 10px rgba(236, 72, 153, 0.5)' : 'none'
                }}
              >
                COMING SOON
              </div>
            </div>
          </div>
        </div>
        
        {/* System info */}
        <div className={`text-center mt-6 ${styles.subtitle} text-xs`}>
          <p>SECURE WEBSOCKET CONNECTIONS • ENCRYPTED PROTOCOLS</p>
          <p className="mt-1 flex items-center justify-center gap-2">
            <AlertTriangle size={12} className={authorizationLevel === 100 ? styles.highlight : styles.subtitle} />
            <span>{authorizationLevel === 100 ? 'SYSTEM READY' : 'SYSTEM INITIALIZING'}</span>
          </p>
        </div>
      </div>
      
      {/* Radar display in the corner */}
      <div 
        className="absolute bottom-6 right-6 w-24 h-24 rounded-full overflow-hidden"
        style={{
          border: `1px solid ${styles.radar}`,
          opacity: 0.7,
          boxShadow: `0 0 10px ${styles.radar}30`
        }}
      >
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle, transparent 0%, ${styles.water} 70%)`
          }}
        ></div>
        
        {/* Radar circles */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 border-2 border-dashed border-opacity-20 rounded-full transform scale-25"
              style={{ borderColor: styles.radar }}></div>
          <div className="absolute inset-0 border border-dashed border-opacity-20 rounded-full transform scale-50"
              style={{ borderColor: styles.radar }}></div>
          <div className="absolute inset-0 border border-dashed border-opacity-20 rounded-full transform scale-75"
              style={{ borderColor: styles.radar }}></div>
        </div>
        
        {/* Radar sweeping line */}
        <div 
          className="absolute top-0 bottom-0 left-1/2 w-1 bg-gradient-to-b origin-bottom"
          style={{ 
            background: `linear-gradient(to top, ${styles.radar}, transparent)`,
            height: '50%',
            transformOrigin: 'bottom center',
            transform: `rotate(${radarSpin}deg)`
          }}
        ></div>
        
        {/* Random radar dots */}
        <div 
          className="absolute rounded-full"
          style={{
            width: '3px',
            height: '3px',
            background: styles.radar,
            top: '30%',
            left: '40%',
            opacity: Math.random() > 0.5 ? 0.8 : 0.2
          }}
        ></div>
        <div 
          className="absolute rounded-full"
          style={{
            width: '2px',
            height: '2px',
            background: styles.radar,
            top: '60%',
            left: '70%',
            opacity: Math.random() > 0.5 ? 0.8 : 0.2
          }}
        ></div>
        <div 
          className="absolute rounded-full"
          style={{
            width: '4px',
            height: '4px',
            background: styles.radar,
            top: '20%',
            left: '75%',
            opacity: Math.random() > 0.7 ? 0.8 : 0.1
          }}
        ></div>
      </div>
      
      {/* Scanlines effect */}
      {styles.scanline && (
        <div 
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
            backgroundSize: '2px 2px',
            opacity: styles.scanlineOpacity
          }}
        ></div>
      )}
      
      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        
        @keyframes ping {
          0% { transform: scale(1); opacity: 0.7; }
          75%, 100% { transform: scale(1.5); opacity: 0; }
        }
        
        @keyframes submarineMove {
          0% { transform: translateX(-150px); }
          100% { transform: translateX(calc(100vw + 150px)); }
        }
        
        @keyframes bubbleRise {
          0% { transform: translateY(0); opacity: 0.7; }
          100% { transform: translateY(-30px); opacity: 0; }
        }
        
        .scale-25 {
          transform: scale(0.25);
        }
        
        .scale-50 {
          transform: scale(0.5);
        }
        
        .scale-75 {
          transform: scale(0.75);
        }
        
        .hover\:scale-102:hover {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
};

export default ImprovedGameModeSelector;