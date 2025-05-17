import React, { useState, useEffect } from 'react';
import { Gamepad2, Terminal, AlertTriangle, ShieldCheck, Shield, Rocket } from 'lucide-react';

const NavalCombat = ({ theme = 'black' }) => {
  const [status, setStatus] = useState('awaiting');
  const [authorization, setAuthorization] = useState(0);
  const [buttonHovered, setButtonHovered] = useState(false);
  const [glitchEffect, setGlitchEffect] = useState(false);
  
  // Theme-specific styling
  const getThemeStyles = () => {
    switch (theme) {
      case 'cyberpunk':
        return {
          container: 'bg-gradient-to-br from-purple-900/70 to-purple-950/90 border-2 border-pink-600',
          title: 'text-cyan-300 cyberpunk-glow',
          status: 'text-pink-300',
          buttonBg: 'bg-pink-900/80 hover:bg-pink-800/90 border border-pink-500',
          buttonText: 'text-cyan-300',
          scanlineBg: 'rgba(236, 72, 153, 0.1)',
          glowEffect: '0 0 15px rgba(6, 182, 212, 0.5)',
          progressBar: 'bg-pink-700',
          progressFill: 'bg-cyan-400',
          iconColor: 'text-cyan-400'
        };
      case 'white':
        return {
          container: 'bg-white/90 shadow-lg border border-gray-300',
          title: 'text-gray-800',
          status: 'text-gray-500',
          buttonBg: 'bg-gray-800 hover:bg-gray-700 border border-gray-900',
          buttonText: 'text-white',
          scanlineBg: 'rgba(0, 0, 0, 0.05)',
          glowEffect: '0 5px 15px rgba(0, 0, 0, 0.1)',
          progressBar: 'bg-gray-200',
          progressFill: 'bg-blue-500',
          iconColor: 'text-blue-500'
        };
      case 'black':
      default:
        return {
          container: 'bg-gradient-to-br from-gray-900/90 to-gray-950/95 border border-gray-700',
          title: 'text-white',
          status: 'text-gray-400',
          buttonBg: 'bg-gray-700/90 hover:bg-gray-600/90 border border-gray-600',
          buttonText: 'text-white',
          scanlineBg: 'rgba(255, 255, 255, 0.05)',
          glowEffect: '0 5px 15px rgba(0, 0, 0, 0.5)',
          progressBar: 'bg-gray-700',
          progressFill: 'bg-blue-500',
          iconColor: 'text-blue-400'
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
    }, 120);
    
    // Random glitch effect
    const glitchInterval = setInterval(() => {
      const shouldGlitch = Math.random() > 0.7;
      if (shouldGlitch) {
        setGlitchEffect(true);
        setTimeout(() => setGlitchEffect(false), 150);
      }
    }, 2000);
    
    return () => {
      clearInterval(authInterval);
      clearInterval(glitchInterval);
    };
  }, []);
  
  // Floating decorative elements
  const FloatingElements = () => (
    <>
      <div className="absolute w-10 h-10 right-8 top-14 opacity-20 animate-pulse">
        <Shield className={`w-full h-full ${styles.iconColor}`} />
      </div>
      <div className="absolute w-6 h-6 left-10 bottom-10 opacity-10 animate-ping">
        <AlertTriangle className={`w-full h-full ${styles.iconColor}`} />
      </div>
      <div className="absolute w-8 h-8 right-12 bottom-20 opacity-15 animate-bounce">
        <Rocket className={`w-full h-full ${styles.iconColor}`} />
      </div>
    </>
  );

  return (
    <div 
      className={`relative w-full h-full flex flex-col justify-center items-center p-6 ${styles.container} rounded-lg overflow-hidden`}
      style={{ 
        boxShadow: styles.glowEffect,
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      {/* Scanlines effect */}
      <div 
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            ${styles.scanlineBg} 2px,
            ${styles.scanlineBg} 4px
          )`
        }}
      ></div>
      
      {/* Glitch effect */}
      {glitchEffect && (
        <div 
          className="absolute inset-0 bg-white opacity-5 z-20 pointer-events-none"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 100% 5%, 0 10%, 0 15%, 100% 20%, 100% 25%, 0 30%, 0 35%, 100% 40%, 100% 45%, 0 50%, 0 55%, 100% 60%, 100% 65%, 0 70%, 0 75%, 100% 80%, 100% 85%, 0 90%, 0 95%, 100% 100%)'
          }}
        ></div>
      )}
      
      {/* Floating decorative elements */}
      <FloatingElements />
      
      {/* Game UI */}
      <div className="flex flex-col items-center text-center relative z-30 w-full max-w-xs transform transition-transform duration-500 hover:scale-105">
        {/* Game logo */}
        <div 
          className={`mb-2 relative ${theme === 'cyberpunk' ? 'cyberpunk-glow' : ''}`}
          style={{
            transform: 'translateZ(20px)',
            textShadow: theme === 'cyberpunk' ? '0 0 10px rgba(6, 182, 212, 0.5)' : 'none'
          }}
        >
          <Gamepad2 
            size={48} 
            className={`mx-auto mb-2 ${styles.iconColor}`}
          />
          <h3 className={`text-2xl font-bold ${styles.title}`}>
            Naval Combat
          </h3>
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
              style={{ width: `${authorization}%` }}
            ></div>
          </div>
          
          {/* Additional status details */}
          <div className="grid grid-cols-2 gap-4 mt-6 text-xs font-mono">
            <div className="text-left">
              <div className={styles.status}>SYSTEM:</div>
              <div className={`${styles.iconColor} font-semibold`}>ONLINE</div>
            </div>
            <div className="text-right">
              <div className={styles.status}>PROTOCOL:</div>
              <div className={`${styles.iconColor} font-semibold`}>ACTIVE</div>
            </div>
            <div className="text-left">
              <div className={styles.status}>CONN:</div>
              <div className={`${styles.iconColor} font-semibold`}>SECURE</div>
            </div>
            <div className="text-right">
              <div className={styles.status}>UPTIME:</div>
              <div className={`${styles.iconColor} font-semibold`}>01:27:33</div>
            </div>
          </div>
        </div>
        
        {/* Play button */}
        <button
          className={`relative overflow-hidden font-mono px-8 py-3 rounded ${styles.buttonBg} ${styles.buttonText} transition-all duration-300 transform ${buttonHovered ? 'scale-105' : ''}`}
          onMouseEnter={() => setButtonHovered(true)}
          onMouseLeave={() => setButtonHovered(false)}
          disabled={status !== 'ready'}
          style={{
            opacity: status === 'ready' ? 1 : 0.7,
            transform: 'translateZ(30px)',
            boxShadow: buttonHovered && theme === 'cyberpunk' ? '0 0 15px rgba(6, 182, 212, 0.6)' : 'none'
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
            <Terminal size={16} className="mr-2" />
            Wanna play?
          </span>
        </button>
        
        {/* Call-to-action hint */}
        <div 
          className={`mt-6 text-xs ${styles.status}`}
          style={{ transform: 'translateZ(5px)' }}
        >
          {status === 'ready' 
            ? 'Secure connection established. Ready for combat.'
            : 'System initializing... Please stand by.'}
        </div>
      </div>
      
      {/* 3D perspective grid background effect */}
      <div 
        className="absolute inset-0 z-0 opacity-30"
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
    </div>
  );
};

export default NavalCombat;