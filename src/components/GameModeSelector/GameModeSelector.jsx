import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, Anchor, Ship, Compass, Waves, Globe, Monitor, Shield, Target } from 'lucide-react';

const GameModeSelector = ({ theme = 'black', onSelectMode, onBack }) => {
  const [hoverMode, setHoverMode] = useState(null);
  const [wavePosition, setWavePosition] = useState(0);
  const [radarSpin, setRadarSpin] = useState(0);
  const [showBubbles, setShowBubbles] = useState(true);
  
  // Theme-specific styling
  const getThemeStyles = () => {
    switch (theme) {
      case 'cyberpunk':
        return {
          container: 'bg-gradient-to-b from-purple-950 to-purple-900',
          title: 'text-cyan-300',
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
          radar: '#06b6d4'
        };
      case 'white':
        return {
          container: 'bg-gradient-to-b from-gray-100 to-white',
          title: 'text-gray-800',
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
          radar: '#3b82f6'
        };
      case 'black':
      default:
        return {
          container: 'bg-gradient-to-b from-gray-950 to-gray-900',
          title: 'text-white',
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
          radar: '#60a5fa'
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
      setShowBubbles(prev => !prev);
    }, 2500);
    
    return () => {
      clearInterval(interval);
      clearInterval(radarInterval);
      clearInterval(bubbleInterval);
    };
  }, []);
  
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
          {showBubbles && (
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
        
        {/* Ship silhouette on the right */}
        <div 
          className="absolute bottom-10 right-20"
          style={{
            width: '180px',
            height: '50px',
            animation: 'shipRock 8s ease-in-out infinite',
            opacity: 0.4
          }}
        >
          <svg viewBox="0 0 180 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M20,30 L40,20 L140,20 L160,30 L20,30 Z" 
              fill={styles.icon}
              opacity="0.8"
            />
            <rect x="50" y="10" width="10" height="10" fill={styles.icon} opacity="0.9" />
            <rect x="70" y="5" width="15" height="15" fill={styles.icon} opacity="0.9" />
            <rect x="95" y="8" width="12" height="12" fill={styles.icon} opacity="0.9" />
          </svg>
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
      <div className="relative z-30 flex flex-col items-center">
        {/* Header with anchor icon */}
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center mb-2">
            <div 
              className={`relative p-2 rounded-full ${styles.icon}`}
              style={{
                animation: 'pulse 2s infinite'
              }}
            >
              <Anchor size={28} className={styles.icon} />
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  border: `2px solid ${styles.icon}`,
                  opacity: 0.5,
                  animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
                  animationDelay: '0.5s'
                }}
              ></div>
            </div>
          </div>
          <h1 className={`text-3xl font-bold mb-2 ${styles.title}`}>
            NAVAL COMBAT SYSTEM
          </h1>
        </div>
        
        {/* Game Mode Selection */}
        <div className="mb-8">
          <h2 className={`text-center text-lg mb-6 ${styles.text}`}>SELECT GAME MODE</h2>
          
          <div className="space-y-4 w-[500px]">
            {/* Computer Mode */}
            <div 
              className={`p-6 rounded-lg cursor-pointer transition-all duration-300 flex justify-between items-center
                ${hoverMode === 'computer' ? styles.cardSelected : styles.card}`}
              onMouseEnter={() => setHoverMode('computer')}
              onMouseLeave={() => setHoverMode(null)}
              onClick={() => onSelectMode && onSelectMode('computer')}
            >
              <div className="flex items-center">
                <div 
                  className={`mr-5 p-2 rounded-full ${hoverMode === 'computer' ? styles.buttonBg : 'bg-gray-700'}`}
                >
                  <Monitor size={24} className={styles.buttonText} />
                </div>
                <div>
                  <h3 className={`text-lg font-semibold ${styles.highlight}`}>
                    Play against computer
                  </h3>
                  <p className={`text-sm ${styles.text}`}>
                    Challenge the AI in a local naval battle
                  </p>
                </div>
              </div>
              <ArrowRight size={20} className={styles.highlight} />
            </div>
            
            {/* Online Mode */}
            <div 
              className={`p-6 rounded-lg cursor-pointer transition-all duration-300 flex justify-between items-center
                ${hoverMode === 'online' ? styles.cardSelected : styles.card}`}
              onMouseEnter={() => setHoverMode('online')}
              onMouseLeave={() => setHoverMode(null)}
              onClick={() => onSelectMode && onSelectMode('online')}
            >
              <div className="flex items-center">
                <div 
                  className={`mr-5 p-2 rounded-full ${hoverMode === 'online' ? styles.buttonBg : 'bg-gray-700'}`}
                >
                  <Globe size={24} className={styles.buttonText} />
                </div>
                <div>
                  <h3 className={`text-lg font-semibold ${styles.highlight}`}>
                    Play online
                  </h3>
                  <p className={`text-sm ${styles.text}`}>
                    Find real opponents to challenge
                  </p>
                </div>
              </div>
              <ArrowRight size={20} className={styles.highlight} />
            </div>
          </div>
        </div>
        
        {/* Version info */}
        <div className="text-center">
          <p className={`text-xs ${styles.text}`}>Version 2.3.4 - Updated System</p>
          <p className={`text-xs ${styles.text}`}>Secure WebSocket Connections</p>
        </div>
      </div>
      
      {/* Radar display in the corner */}
      <div 
        className="absolute bottom-6 right-6 w-32 h-32 rounded-full overflow-hidden"
        style={{
          border: `2px solid ${styles.radar}`,
          opacity: 0.7,
          boxShadow: `0 0 10px ${styles.radar}`
        }}
      >
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle, transparent 0%, ${styles.water} 70%)`
          }}
        ></div>
        
        {/* Radar circles */}
        <div className="absolute inset-0 flex items-center justify-center">
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
      
      {/* Compass in the corner */}
      <div 
        className="absolute top-6 right-6 w-24 h-24 rounded-full"
        style={{
          border: `2px solid ${styles.icon}`,
          opacity: 0.7,
          boxShadow: `0 0 5px ${styles.icon}`
        }}
      >
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle, ${styles.container.split(' ')[0]} 0%, ${styles.water} 100%)`
          }}
        ></div>
        
        <div className="absolute inset-0 flex items-center justify-center">
          {/* North marker */}
          <div 
            className="absolute w-1 h-8 bg-red-500 top-1"
            style={{ left: 'calc(50% - 0.5px)' }}
          ></div>
          
          {/* Other markers */}
          <div 
            className="absolute w-1 h-5 bg-white bottom-1 opacity-70"
            style={{ left: 'calc(50% - 0.5px)' }}
          ></div>
          <div 
            className="absolute w-5 h-1 bg-white left-1 opacity-70"
            style={{ top: 'calc(50% - 0.5px)' }}
          ></div>
          <div 
            className="absolute w-5 h-1 bg-white right-1 opacity-70"
            style={{ top: 'calc(50% - 0.5px)' }}
          ></div>
          
          {/* Center */}
          <div 
            className="absolute w-3 h-3 rounded-full"
            style={{ 
              background: styles.icon,
              left: 'calc(50% - 1.5px)',
              top: 'calc(50% - 1.5px)',
            }}
          ></div>
          
          {/* N, S, E, W labels */}
          <div className="absolute top-3 text-xs font-bold text-red-500" style={{top: '-15px', marginLeft: '3px'}}>N</div>
          <div className="absolute bottom-3 text-xs font-bold text-white opacity-70" style={{bottom: '-15px', marginLeft: '3px'}}>S</div>
          <div className="absolute right-3 text-xs font-bold text-white opacity-70" style={{right: '-10px'}}>E</div>
          <div className="absolute left-3 text-xs font-bold text-white opacity-70" style={{left: '-15px'}}>W</div>
        </div>
      </div>
      
      {/* Scanlines effect */}
      {styles.scanline && (
        <div 
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
            backgroundSize: '2px 2px',
            opacity: 0.2
          }}
        ></div>
      )}
      
      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes submarineMove {
          0% { transform: translateX(-150px); }
          100% { transform: translateX(calc(100vw + 150px)); }
        }
        
        @keyframes bubbleRise {
          0% { transform: translateY(0); opacity: 0.7; }
          100% { transform: translateY(-30px); opacity: 0; }
        }
        
        @keyframes shipRock {
          0%, 100% { transform: rotate(-1deg); }
          50% { transform: rotate(1deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        
        @keyframes ping {
          0% { transform: scale(1); opacity: 0.7; }
          75%, 100% { transform: scale(1.5); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default GameModeSelector;