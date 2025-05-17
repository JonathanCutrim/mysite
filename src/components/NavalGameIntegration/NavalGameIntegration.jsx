import React, { useEffect, useState } from 'react';
import EnhancedNavalGame from '../EnhancedNavalGame/EnhancedNavalGame';
import ImprovedNavalCombat from '../ImprovedNavalCombat/ImprovedNavalCombat';
import Battleship from '../Battleship/Battleship';

// Este componente pode substituir o componente atual de jogo naval em sua aplicação
// Ele integra o ImprovedNavalCombat (para a prévia) com o Battleship (para o jogo real)
// Removendo a duplicação na seleção de modo e o aviso "COMING SOON" incorreto

const NavalGameIntegration = ({ theme = 'black', onBack }) => {
  const [showFullGame, setShowFullGame] = useState(false);
  
  // Função para abrir o jogo completo
  const openFullGame = () => {
    setShowFullGame(true);
  };
  
  // Função para voltar à prévia
  const backToPreview = () => {
    setShowFullGame(false);
  };
  
  return (
    <div className="w-full h-full relative">
      {!showFullGame ? (
        // Mostrar a prévia do jogo com o ImprovedNavalCombat
        <div className="w-full h-full p-6 flex items-center justify-center">
          <div className="w-full max-w-md transition-transform duration-300 hover:scale-105">
            <ImprovedNavalCombat 
              theme={theme} 
              onClick={openFullGame}
            />
          </div>
        </div>
      ) : (
        // Mostrar o jogo completo diretamente com Battleship
        // Sem a etapa intermediária de seleção de modo
        <div className="w-full h-full">
          <div className="absolute top-4 left-4 z-40">
            <button 
              onClick={backToPreview}
              className={`px-3 py-1 rounded-md flex items-center gap-2 text-sm ${
                theme === 'cyberpunk' 
                  ? 'bg-pink-800 text-cyan-300 hover:bg-pink-700' 
                  : theme === 'black'
                    ? 'bg-gray-800 text-white hover:bg-gray-700'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              ← Voltar
            </button>
          </div>
          <Battleship theme={theme} isExpanded={true} />
        </div>
      )}
    </div>
  );
};

export default NavalGameIntegration;