import { useGame } from '@/store/GameContext';
import { BoosterProps } from '../Booster';
import circle from '@/assets/PetCircle/pet_circle.png';
import { UpgradeButton } from '../UpgradeButton/UpgradeButton';

export const PetCircle: React.FC<BoosterProps> = ({ level, nextLevelCost }) => {
  const { gameState, dispatch } = useGame();

  const upgradeBooster = () => {
    if (gameState.clicks >= nextLevelCost) {
      dispatch({ type: 'UPDATE_CLICKS', payload: gameState.clicks - nextLevelCost });
      dispatch({ type: 'UPGRADE_BOOSTER', payload: { boosterId: 'petCircle' } });
    }
  };

  const handlePet = () => {
    dispatch({ type: 'UPDATE_CLICKS', payload: gameState.clicks + Math.floor(Math.pow(2, level)) });
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div 
        className="w-24 h-24 cursor-grab hover:scale-110 transition-transform"
        onMouseLeave={handlePet}
      >
        <img
          src={circle}
          alt="Pet Circle"
          className="w-full h-full rounded-full object-cover"
        />
      </div>
      <UpgradeButton
        nextLevelCost={nextLevelCost}
        onUpgrade={upgradeBooster}
        disabled={gameState.clicks < nextLevelCost}
      />
      <div className="text-xs text-center">
        Level {level}
        <br />
        +{Math.floor(Math.pow(2, level))} per pet
      </div>
    </div>
  );
}; 