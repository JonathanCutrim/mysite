import React, { useState, useEffect } from 'react';
import { Gamepad2, Terminal, AlertTriangle, Shield, Rocket, Crosshair, Target, Anchor, Globe } from 'lucide-react';

const ImprovedNavalCombat = ({ theme = 'black', onClick }) => {
  const [status, setStatus] = useState('awaiting');
  const [authorization, setAuthorization] = useState(0);
  const [buttonHovered, setButtonHovered] = useState(false);
  const [glitchEffect, setGlitchEffect] = useState(false);
  const [radarSpin, setRadarSpin] = useState(0);
  const [wavePosition, setWavePosition] = useState(0);
  
  // Theme-specific styling
  const getThemeStyles = () => {
    switch (theme) {
      case 'cyberpunk':
        return {
          container: 'bg-gradient-to-br from-purple-900/80 to-purple-950/90 border-2 border-pink-600',
          title: 'text-cyan-300 cyberpunk-glow',
          subtitle: 'text-pink-300',
          status: 'text-pink-300',
          buttonBg: 'bg-pink-900/80 hover:bg-pink-800/90 border border-pink-500',
          buttonText: 'text-cyan-300',
          scanlineBg: 'rgba(236, 72, 153, 0.1)',
          glowEffect: '0 0 15px rgba(6, 182, 212, 0.5)',
          progressBar: 'bg-pink-900/50',
          progressFill: 'bg-cyan-500',
          iconColor: 'text-cyan-400',
          water: '#0f172a',
          submarine: '#ec4899',
          bubbles: '#06b6d4',
          radar: '#06b6d4'
        };
      case 'white':
        return {
          container: 'bg-white/90 shadow-lg border border-gray-300',
          title: 'text-gray-800',
          subtitle: 'text-gray-600',
          status: 'text-gray-500',
          buttonBg: 'bg-gray-800 hover:bg-gray-700 border border-gray-900',
          buttonText: 'text-white',
          scanlineBg: 'rgba(0, 0, 0, 0.05)',
          glowEffect: '0 5px 15px rgba(0, 0, 0, 0.1)',
          progressBar: 'bg-gray-200',
          progressFill: 'bg-blue-500',
          iconColor: 'text-blue-500',
          water: '#f0f9ff',
          submarine: '#3b82f6',
          bubbles: '#60a5fa',
          radar: '#3b82f6'
        };
      case 'black':
      default:
        return {
          container: 'bg-gradient-to-br from-gray-900/90 to-gray-950/95 border border-gray-700',
          title: 'text-white',
          subtitle: 'text-gray-400',
          status: 'text-gray-400',
          buttonBg: 'bg-gray-700/90 hover:bg-gray-600/90 border border-gray-600',
          buttonText: 'text-white',
          scanlineBg: 'rgba(255, 255, 255, 0.05)',
          glowEffect: '0 5px 15px rgba(0, 0, 0, 0.5)',
          progressBar: 'bg-gray-700',
          progressFill: 'bg-blue-500',
          iconColor: 'text-blue-400',
          water: '#0f172a',
          submarine: '#60a5fa',
          bubbles: '#93c5fd',
          radar: '#60a5fa'
        };
    }
  };
  
  const styles = getThemeStyles();
  
  // Simulate authorization process
  useEffect(() => {
    // Simulates incremental authorization progress
    const authInterval = setInterval(() => {
      if (authorization < 100) {
        setAuthorization(prev => {
          const increment = Math.floor(Math.random() * 5) + 1;
          const newValue = Math.min(prev + increment, 100);
          
          // When completed
          if (newValue === 100) {
            setStatus('ready');
            clearInterval(authInterval);
          }
          
          return newValue;
        });
      }
    }, 100);
    
    // Random glitch effect
    const glitchInterval = setInterval(() => {
      const shouldGlitch = Math.random() > 0.7;
      if (shouldGlitch) {
        setGlitchEffect(true);
        setTimeout(() => setGlitchEffect(false), 150);
      }
    }, 2000);
    
    // Animate radar sweep
    const radarInterval = setInterval(() => {
      setRadarSpin(prev => prev + 3);
    }, 30);
    
    // Animate waves
    const waveInterval = setInterval(() => {
      setWavePosition(prev => (prev + 1) % 100);
    }, 50);
    
    return () => {
      clearInterval(authInterval);
      clearInterval(glitchInterval);
      clearInterval(radarInterval);
      clearInterval(waveInterval);
    };
  }, []);
  
  // Water animation at the bottom
  const WaterAnimation = () => (
    <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
      <div 
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            180deg,
            transparent 0%,
            ${styles.water}80 100%
          )`
        }}
      ></div>
      
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
      
      {/* Submarine silhouette */}
      <div 
        className="absolute bottom-5 right-10"
        style={{
          width: '60px',
          height: '20px',
          animation: 'submarineMove 15s linear infinite',
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
      </div>
    </div>
  );
  
  // Radar animation
  const RadarAnimation = () => (
    <div 
      className="absolute top-6 right-6 w-20 h-20 rounded-full overflow-hidden"
      style={{
        border: `1px solid ${styles.radar}`,
        opacity: 0.5,
        boxShadow: `0 0 5px ${styles.radar}30`
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
    </div>
  );
  
  // Animated anchor icon
  const AnimatedAnchor = () => (
    <div className={`relative ${authorization === 100 ? 'animate-bounce' : ''}`}>
      <Anchor 
        size={36} 
        className={styles.iconColor}
        style={{
          opacity: authorization === 100 ? 1 : 0.6
        }}
      />
      {authorization === 100 && (
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            border: `2px solid ${styles.iconColor}`,
            opacity: 0.5,
            animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
            animationDelay: '0.5s'
          }}
        ></div>
      )}
    </div>
  );

  return (
    <div 
      className={`relative w-full h-full flex flex-col items-center justify-center p-6 ${styles.container} rounded-lg overflow-hidden cursor-pointer`}
      style={{ 
        boxShadow: styles.glowEffect,
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
      onClick={authorization === 100 ? onClick : undefined}
    >
      {/* Scanlines effect */}
      {theme !== 'white' && (
        <div 
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              ${styles.scanlineBg} 2px,
              ${styles.scanlineBg} 4px
            )`,
            opacity: theme === 'cyberpunk' ? 0.3 : 0.1
          }}
        ></div>
      )}
      
      {/* Glitch effect */}
      {glitchEffect && (
        <div 
          className="absolute inset-0 bg-white opacity-5 z-20 pointer-events-none"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 100% 5%, 0 10%, 0 15%, 100% 20%, 100% 25%, 0 30%, 0 35%, 100% 40%, 100% 45%, 0 50%, 0 55%, 100% 60%, 100% 65%, 0 70%, 0 75%, 100% 80%, 100% 85%, 0 90%, 0 95%, 100% 100%)'
          }}
        ></div>
      )}
      
      {/* Radar in corner */}
      <RadarAnimation />
      
      {/* Game UI */}
      <div className="flex flex-col items-center text-center relative z-30 w-full max-w-xs transform">
        {/* Game logo */}
        <div 
          className={`mb-4 relative ${theme === 'cyberpunk' ? 'cyberpunk-glow' : ''}`}
          style={{
            transform: 'translateZ(20px)',
            textShadow: theme === 'cyberpunk' ? '0 0 10px rgba(6, 182, 212, 0.5)' : 'none'
          }}
        >
          <AnimatedAnchor />
          <h3 className={`text-2xl font-bold ${styles.title}`}>
            NAVAL COMBAT
          </h3>
          <p className={`text-sm ${styles.subtitle} mt-1`}>
            TACTICAL SIMULATION V2.3.4
          </p>
        </div>
        
        {/* Authorization status */}
        <div 
          className="w-full mb-6"
          style={{ transform: 'translateZ(10px)' }}
        >
          <div className="flex justify-between items-center mb-2">
            <span className={`text-xs font-mono uppercase tracking-wider ${styles.status}`}>
              STATUS:
            </span>
            <span className={`text-xs font-mono uppercase tracking-wider ${status === 'ready' ? styles.iconColor : styles.status}`}>
              {status === 'awaiting' ? 'AWAITING AUTHORIZATION' : 'AUTHORIZED'}
            </span>
          </div>
          
          {/* Progress bar */}
          <div className={`w-full h-1.5 ${styles.progressBar} rounded-full overflow-hidden`}>
            <div 
              className={`h-full ${styles.progressFill} transition-all duration-300 ease-out`}
              style={{ 
                width: `${authorization}%`,
                boxShadow: theme === 'cyberpunk' ? '0 0 8px rgba(6, 182, 212, 0.5)' : 'none'
              }}
            ></div>
          </div>
          
          {/* Additional status details */}
          <div className="grid grid-cols-2 gap-4 mt-4 text-xs font-mono">
            <div className="text-left">
              <div className={styles.status}>SYSTEM:</div>
              <div className={`${styles.iconColor} font-semibold`}>ONLINE</div>
            </div>
            <div className="text-right">
              <div className={styles.status}>CONN:</div>
              <div className={`${styles.iconColor} font-semibold`}>SECURE</div>
            </div>
          </div>
        </div>
        
        {/* Play button */}
        <button
          className={`relative overflow-hidden font-mono px-8 py-3 rounded ${styles.buttonBg} ${styles.buttonText} transition-all duration-300 transform ${buttonHovered ? 'scale-105' : ''}`}
          onMouseEnter={() => setButtonHovered(true)}
          onMouseLeave={() => setButtonHovered(false)}
          disabled={status !== 'ready'}
          onClick={onClick}
          style={{
            opacity: status === 'ready' ? 1 : 0.7,
            transform: 'translateZ(30px)',
            boxShadow: buttonHovered && theme === 'cyberpunk' ? '0 0 15px rgba(6, 182, 212, 0.6)' : 'none',
            cursor: status === 'ready' ? 'pointer' : 'default'
          }}
        >
          {/* Animated shine effect */}
          <span 
            className="absolute inset-0 z-10 bg-white"
            style={{
              opacity: buttonHovered ? 0.2 : 0,
              transform: `skewX(-20deg) translateX(${buttonHovered ? '200%' : '-100%'})`,
              transition: 'transform 0.8s ease, opacity 0.3s ease'
            }}
          ></span>
          
          <span className="relative z-20 flex items-center justify-center">
            <Gamepad2 size={16} className="mr-2" />
            <span>ENGAGE</span>
          </span>
        </button>
        
        {/* Floating action indicators for ready state */}
        {status === 'ready' && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-16 left-10 opacity-20 animate-ping">
              <Target size={20} className={styles.iconColor} />
            </div>
            <div className="absolute bottom-24 right-12 opacity-15 animate-pulse">
              <Crosshair size={24} className={styles.iconColor} />
            </div>
          </div>
        )}
        
        {/* Call-to-action hint */}
        <div 
          className={`mt-4 text-xs ${styles.status}`}
          style={{ transform: 'translateZ(5px)' }}
        >
          {status === 'ready' 
            ? 'Connection established. Click to start.'
            : 'System initializing... Please stand by.'}
        </div>
      </div>
      
      {/* Water animation */}
      <WaterAnimation />
      
      {/* 3D perspective grid background effect */}
      <div 
        className={`absolute inset-0 z-0 ${authorization === 100 ? 'opacity-40' : 'opacity-20'}`}
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
          transform: 'perspective(500px) rotateX(80deg) translateY(100px) scale(2)',
          transformOrigin: 'center bottom'
        }}
      ></div>
      
      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes ping {
          0% { transform: scale(1); opacity: 0.7; }
          75%, 100% { transform: scale(1.5); opacity: 0; }
        }
        
        @keyframes submarineMove {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
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
      `}</style>
    </div>
  );
};

export default ImprovedNavalCombat;