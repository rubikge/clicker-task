import { useGame } from '@/store/GameContext';
import { useState } from 'react';
import buttonDefault from '@/assets/MainButton/button_default.png';
import buttonPressed from '@/assets/MainButton/button_pressed.png';
import { BoosterProps } from '../Booster';
import { UpgradeButton } from '../UpgradeButton/UpgradeButton';

export const MainButton: React.FC<BoosterProps> = ({ level, nextLevelCost }) => {
  const { gameState, dispatch } = useGame();
  const [isPressed, setIsPressed] = useState(false);

  const handleMouseDown = () => {
    if (!isPressed) {
      setIsPressed(true);
      dispatch({ type: 'UPDATE_CLICKS', payload: gameState.clicks + level });
    }
  };

  const handleMouseUp = () => {
    if (isPressed) {
      setIsPressed(false);
    }
  };

  const handleUpgrade = () => {
    if (gameState.clicks >= nextLevelCost) {
      dispatch({ type: 'UPDATE_CLICKS', payload: gameState.clicks - nextLevelCost });
      dispatch({ type: 'UPGRADE_BOOSTER', payload: { boosterId: 'mainButton' } });
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <img
          src={isPressed ? buttonPressed : buttonDefault}
          alt="Click Button"
          className="w-32 h-32 cursor-pointer select-none"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          draggable={false}
        />
        <div className="absolute bottom-2 left-0 right-0 text-center 
                        text-white text-xl font-bold drop-shadow-lg">
          {level === 1 ? '1 click' : `${level} clicks`}
        </div>
      </div>
      <UpgradeButton
        nextLevelCost={nextLevelCost}
        onUpgrade={handleUpgrade}
        disabled={gameState.clicks < nextLevelCost}
      />
    </div>
  );
}; 