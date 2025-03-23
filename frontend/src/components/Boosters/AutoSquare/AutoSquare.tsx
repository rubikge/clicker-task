import { useEffect } from 'react';
import { useGame } from '@/store/GameContext';
import { BoosterProps } from '../Booster';
import { UpgradeButton } from '../UpgradeButton/UpgradeButton';
import squareGif from '@/assets/AutoSquare/square.gif';

export const AutoSquare: React.FC<BoosterProps> = ({ level, nextLevelCost }) => {
  const { gameState, dispatch } = useGame();

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: 'UPDATE_CLICKS', payload: gameState.clicks + Math.pow(2, level) });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState.clicks, dispatch, level]);

  const handleUpgrade = () => {
    if (gameState.clicks >= nextLevelCost) {
      dispatch({ type: 'UPDATE_CLICKS', payload: gameState.clicks - nextLevelCost });
      dispatch({ type: 'UPGRADE_BOOSTER', payload: { boosterId: 'autoSquare' } });
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <img 
        src={squareGif} 
        alt="Auto Square" 
        className="w-12 h-12"
        draggable={false}
      />
      <UpgradeButton
        nextLevelCost={nextLevelCost}
        onUpgrade={handleUpgrade}
        disabled={gameState.clicks < nextLevelCost}
      />
      <div className="text-xs text-center">
        Level {level}
        <br />
        +{Math.pow(2, level)}/sec
      </div>
    </div>
  );
}; 