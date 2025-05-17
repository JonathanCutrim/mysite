import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Github,
  Twitter,
  Facebook,
  Youtube,
  Moon,
  Sun,
  Monitor,
  X,
  Zap,
  Linkedin,
  Send,
  MessageSquare,
  Phone,
  Gamepad2,
} from "lucide-react";
import TerminalContactForm from "./TerminalContactForm";
import SharedTerminal from "./SharedTerminal";
import SimpleTransition from "./RetroTransition";
import LogoAnimation from "./LogoAnimation";
import NameAnimation from "./NameAnimation";
import Skills from "./Pages/Skills";
import Work from "./Pages/Works";
import EnhancedBattleshipGame from "./EnhancedBattleshipGame/EnhancedBattleshipGame";
import NavalCombat from './NavalCombat/NavalCombat';
import { projects } from "./Content/projects";
import themeColors from "./Content/themeColors";
import TrueFocus from './TrueFocus/TrueFocus';

import './home.css';
import './naval-animations.css';

const Portfolio = () => {
  const [theme, setTheme] = useState("black"); 
  const [activePage, setActivePage] = useState("home");
  const [transitionActive, setTransitionActive] = useState(false);
  const [nextPage, setNextPage] = useState("home");
  const [gameExpanded, setGameExpanded] = useState(false);
  const [showBattleship, setShowBattleship] = useState(false);
  
  // States for terminals
  const [isGameTerminalOpen, setIsGameTerminalOpen] = useState(false);
  const gameTerminalRef = useRef(null);
  
  // Reference for the terminal content
  const terminalContentRef = useRef(null);

  const colors = themeColors[theme];

  const navigateTo = (page) => {
    if (page === activePage) return;
    setTransitionActive(true);
    setNextPage(page);
  };

  const handleTransitionEnd = () => {
    setActivePage(nextPage);

    setTimeout(() => {
      setTransitionActive(false);
    }, 300);
  };

  const changeTheme = (newTheme) => {
    if (newTheme !== theme) {
      const nextTheme = newTheme;
      setTransitionActive(true);

      setTimeout(() => {
        setTheme(nextTheme);
        setTimeout(() => {
          setTransitionActive(false);
        }, 300);
      }, 500);
    }
  };

  // Open the full Battleship game
  const openBattleshipGame = () => {
    setShowBattleship(true);
    setGameExpanded(true);
  };

  // Go back to the compact game preview
  const backToGamePreview = () => {
    setShowBattleship(false);
    setGameExpanded(false);
  };

  return (
    <>
      <SimpleTransition
        isActive={transitionActive}
        theme={theme}
        onTransitionEnd={handleTransitionEnd}
      />

      <div className="flex flex-col h-screen relative">
        <div className="vhs-overlay absolute inset-0 pointer-events-none z-20"></div>

        <div className="flex flex-grow overflow-hidden">
          {/* Left Column */}
          <div
            className={`flex flex-col items-center z-50 relative justify-between py-6 ${colors.sidebar} ${colors.text}`}
            style={{ width: "64px", zIndex: 30 }}
          >
            <LogoAnimation
              themeColor={theme}
              onClick={() => navigateTo("home")}
            />
            <div className="flex flex-col gap-8 items-center">
              <button
                onClick={() => navigateTo("skills")}
                className={`writing-vertical-lr transform -rotate-90 text-base font-medium tracking-wider cursor-pointer ${
                  activePage === "skills"
                    ? theme === "cyberpunk"
                      ? "text-cyan-300 cyberpunk-glow"
                      : colors.text
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Skills
              </button>
              <button
                onClick={() => navigateTo("work")}
                className={`writing-vertical-lr transform -rotate-90 text-base font-medium tracking-wider cursor-pointer ${
                  activePage === "work"
                    ? theme === "cyberpunk"
                      ? "text-cyan-300 cyberpunk-glow"
                      : colors.text
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Work
              </button>
              <a href="#" className={`text-gray-400 hover:${colors.text}`}>
                <Github size={24} />
              </a>
              <a href="#" className={`text-gray-400 hover:${colors.text}`}>
                <Twitter size={24} />
              </a>
              <a href="#" className={`text-gray-400 hover:${colors.text}`}>
                <Facebook size={24} />
              </a>
              <a href="#" className={`text-gray-400 hover:${colors.text}`}>
                <Youtube size={24} />
              </a>
            </div>
            <div></div> {/* Spacer */}
          </div>

          {/* Right Column  */}
          <div className="flex-grow">
            <div
              className={`flex justify-between items-center h-16 z-50 ${colors.border} border-b relative ${colors.bg}`}
            >
              <div
                className={`ml-6 ${colors.secondaryText} cursor-pointer hover:underline transition-all duration-200 flex items-center gap-2`}
              >
                <MessageSquare size={16} className="animate-bounce" />
                <span>
                  {/* Using the proper TerminalContactForm component with bottom position */}
                  <TerminalContactForm
                    buttonType="text"
                    buttonText="Say hi to me..."
                    position="bottom"
                    className="terminal-container"
                  />
                </span>
              </div>

              <div className="flex">
                <button
                  onClick={() => changeTheme("white")}
                  className={`p-2 cursor-pointer ${
                    theme === "white"
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  }`}
                >
                  <Sun size={20} />
                </button>
                <button
                  onClick={() => changeTheme("black")}
                  className={`p-2 cursor-pointer ${
                    theme === "black"
                      ? "bg-white text-black"
                      : "bg-black text-white"
                  }`}
                >
                  <Moon size={20} />
                </button>
                <button
                  onClick={() => changeTheme("cyberpunk")}
                  className={`p-2 cursor-pointer ${
                    theme === "cyberpunk"
                      ? "bg-pink-600 text-cyan-300"
                      : "bg-purple-800 text-pink-300"
                  }`}
                >
                  <Zap size={20} />
                </button>
              </div>
            </div>

            {/* Content Pages */}
            {activePage === "home" && (
              <div className={`flex h-full ${colors.bg} ${colors.text}`} style={{ height: "calc(100% - 64px)" }}>
                {/* Left side - Developer introduction with centered text */}
                <div className="w-1/2 flex flex-col justify-center items-center px-8 py-8 relative">
                  <div className="relative z-10 text-center">
                    {/* Badge for cyberpunk theme */}
                    {theme === "cyberpunk" && (
                      <div className="inline-block px-3 py-1 mb-6 border border-pink-500 text-cyan-300 text-sm font-medium tracking-wider">
                        {"<"}DEV{">"}
                      </div>
                    )}

                    {/* Main title with name */}
                    <div className="mb-8">
                      <h1 className={`text-5xl md:text-6xl font-bold mb-1 ${
                        theme === "cyberpunk" ? "text-cyan-300 cyberpunk-glow" : ""
                      }`}>
                        Hello, I'm
                      </h1>
                      
                      <h2 className={`text-6xl md:text-7xl font-extrabold ${
                        theme === "cyberpunk" ? "text-pink-300" : ""
                      }`}>
                        Jonathan Lacerda
                      </h2>
                      
                      <div className={`w-32 h-1 mt-6 mb-8 mx-auto ${
                        theme === "cyberpunk" ? "bg-pink-500" : "bg-gray-400"
                      }`}></div>
                    </div>

                    {/* Specialties - centered */}
                    <div className="flex flex-wrap gap-3 mb-6 justify-center">
                      <TrueFocus 
                        sentence="Front-End VTEX E-commerce Games"
                        manualMode={false}
                        blurAmount={3}
                        borderColor="#6b21a6"
                        animationDuration={2}
                        pauseBetweenAnimations={1}
                      />
                    </div>

                    {/* Bio - centered */}
                    <div className={`space-y-4 mb-8 mx-auto ${
                      theme === "cyberpunk" ? "text-gray-300" : theme === "black" ? "text-gray-300" : "text-gray-600"
                    }`}>
                      <p className="text-lg leading-relaxed">
                        Desenvolvedor front-end com mais de uma década de experiência em arquitetura de interfaces e sistemas de e-commerce.
                      </p>
                      <p className="text-lg leading-relaxed">
                        Especializado na criação de experiências digitais refinadas e performáticas com foco em conversão.
                      </p>
                      <p className="text-lg leading-relaxed">
                        Recentemente, expandindo horizontes no desenvolvimento de jogos e aplicações interativas.
                      </p>
                    </div>
                  </div>
                  
                  {/* Decorative background elements - visible only in non-white themes */}
                  {theme !== "white" && (
                    <>
                      <div className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full opacity-10 blur-2xl"
                        style={{ 
                          background: theme === "cyberpunk" ? 
                            "radial-gradient(circle, rgba(236,72,153,1) 0%, rgba(139,92,246,0) 70%)" : 
                            "radial-gradient(circle, rgba(59,130,246,0.5) 0%, rgba(59,130,246,0) 70%)" 
                        }}
                      ></div>
                      <div className="absolute bottom-1/3 right-1/4 w-24 h-24 rounded-full opacity-10 blur-xl"
                        style={{ 
                          background: theme === "cyberpunk" ? 
                            "radial-gradient(circle, rgba(6,182,212,1) 0%, rgba(139,92,246,0) 70%)" : 
                            "radial-gradient(circle, rgba(59,130,246,0.5) 0%, rgba(59,130,246,0) 70%)" 
                        }}
                      ></div>
                    </>
                  )}
                </div>

                {/* Right side - Game section */}
                <div className={`w-1/2 flex flex-col h-full ${colors.secondaryBg}`} style={{ position: 'relative' }}>
                  {showBattleship ? (
                    /* Full game component with GameModeSelector */
                    <div className="relative w-full h-full">
                      <EnhancedBattleshipGame 
                        theme={theme} 
                        onBack={backToGamePreview} 
                      />
                    </div>
                  ) : (
                    /* Enhanced Naval Combat preview component */
                    <div 
                      className="w-full h-full p-6 flex items-center justify-center cursor-pointer"
                      onClick={openBattleshipGame}
                    >
                      <div className="w-full max-w-md transition-transform duration-300 hover:scale-105">
                        <NavalCombat theme={theme} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Skills Page */}
            <Skills
              theme={theme}
              activePage={activePage}
              colors={colors}
              Monitor={Monitor}
            />

            {/* Work Page - E-commerce Style */}
            <Work theme={theme} colors={colors} projects={projects} />

            {/* Footer - Navigation */}
            <div className={`flex ${colors.border} border-t relative`}>
              <button
                onClick={() => navigateTo("home")}
                className={`w-1/3 py-4 text-center cursor-pointer ${
                  activePage === "home" ? "font-bold" : ""
                } ${colors.bg} ${colors.text}`}
              >
                About.
              </button>
              <button
                onClick={() => navigateTo("skills")}
                className={`w-1/3 py-4 text-center cursor-pointer ${
                  activePage === "skills" ? "font-bold" : ""
                } ${colors.bg} ${colors.text}`}
              >
                My Skills.
              </button>
              <button
                onClick={() => navigateTo("work")}
                className={`w-1/3 py-4 text-center cursor-pointer ${
                  activePage === "work" ? "font-bold" : ""
                } ${colors.bg} ${colors.text}`}
              >
                My Work.
              </button>
              <div className="absolute bottom-4 right-4 w-12 h-12 relative">
                {/* Theme symbol indicator */}
                <div
                  className={`w-full h-full flex items-center justify-center relative ${
                    theme === "cyberpunk"
                      ? "bg-purple-900 border-2 border-pink-500"
                      : theme === "black"
                      ? "bg-black border-2 border-white"
                      : "bg-white border-2 border-black"
                  }`}
                >
                  {theme === "white" && (
                    <Sun size={20} className="text-black" />
                  )}
                  {theme === "black" && (
                    <Moon size={20} className="text-white" />
                  )}
                  {theme === "cyberpunk" && (
                    <Zap size={20} className="text-cyan-300" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Portfolio;