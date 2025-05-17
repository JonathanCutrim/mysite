import React, { useState } from 'react';
import { Github } from 'lucide-react';
import CircularText from '../CircularText/CircularText';
import ShinyText from '../ShinyText/ShinyText';
import './Cards.css';

const Cards = ({ project, theme, onAddToCollection }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Define theme-specific styles
  const getThemeStyles = () => {
    switch (theme) {
      case 'cyberpunk':
        return {
          card: "border-pink-600 bg-purple-900/80",
          overlayText: "text-cyan-300 cyberpunk-glow",
          tagBg: "bg-purple-800/70",
          tagBorder: "border-pink-500",
          tagText: "text-cyan-300",
          actionButton: "bg-pink-600 text-cyan-300 hover:bg-pink-700",
          githubIcon: "text-pink-300 hover:text-cyan-300",
          shinyTextContainer: "bg-pink-900/80"
        };
      case 'black':
        return {
          card: "border-gray-700 bg-gray-800/80",
          overlayText: "text-white",
          tagBg: "bg-gray-800/70",
          tagBorder: "border-gray-600",
          tagText: "text-gray-300",
          actionButton: "bg-white text-black hover:bg-gray-200",
          githubIcon: "text-gray-300 hover:text-white",
          shinyTextContainer: "bg-gray-700/80"
        };
      case 'white':
      default:
        return {
          card: "border-gray-300 bg-white/80",
          overlayText: "text-black",
          tagBg: "bg-white/70",
          tagBorder: "border-gray-300",
          tagText: "text-gray-800",
          actionButton: "bg-black text-white hover:bg-gray-800",
          githubIcon: "text-gray-700 hover:text-black",
          shinyTextContainer: "bg-gray-200/90"
        };
    }
  };
  
  const styles = getThemeStyles();
  
  return (
    <div 
      className={`project-card relative overflow-hidden rounded-lg shadow-lg border ${styles.card} transition-all duration-300 h-64`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" 
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${theme === 'cyberpunk' ? 'from-purple-900/90' : theme === 'black' ? 'from-gray-900/90' : 'from-gray-100/90'} to-transparent`}></div>
      </div>
      
      {/* Project Title Overlay - Large, semi-transparent */}
      <div className="absolute inset-0 flex items-center card-box">
        <h2 
          className={`text-5xl font-extrabold opacity-30 text-center px-4 tracking-wider ${styles.overlayText} uppercase title`}
          style={{ textShadow: theme === 'cyberpunk' ? '0 0 15px rgba(34, 211, 238, 0.8)' : 'none' }}
        >
          {project.title}
        </h2>
      </div>
      
      {/* Technology Tags - Top right position */}
      <div className="absolute w-1/2 bottom-4 right-4 flex flex-wrap gap-2 justify-end tech-box">
        <CircularText
          text="VTEX*REACT*NODE*"
          onHover="speedUp"
          spinDuration={20}
          className="custom-class"
        />
      </div>
      
      {/* Action Buttons - Appear on hover from TOP instead of bottom */}
      <div 
        className={`absolute top-0 left-0 right-0 p-4 flex justify-between items-center transition-transform duration-300 ${isHovered ? 'translate-y-0' : '-translate-y-full'}`}
        style={{ 
          background: theme === 'cyberpunk' 
            ? 'linear-gradient(to bottom, rgba(88, 28, 135, 0.9), rgba(88, 28, 135, 0))' 
            : theme === 'black' 
              ? 'linear-gradient(to bottom, rgba(17, 24, 39, 0.9), rgba(17, 24, 39, 0))' 
              : 'linear-gradient(to bottom, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0))' 
        }}
      >
        <a 
          href={project.githubUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className={`p-2 rounded-full transition-all duration-200 ${styles.githubIcon} hover:scale-110`}
        >
          <Github size={20} />
        </a>
        
        <button
          onClick={() => onAddToCollection(project)}
          className={`px-3 py-1 rounded font-bold border transition-all duration-200 border hover:scale-105`}
        >
          {/* ShinyText with background container for better contrast */}
          <div className={`px-2 py-1 rounded uppercase`}>
          View
          </div>
        </button>
      </div>
    </div>
  );
};

export default Cards;