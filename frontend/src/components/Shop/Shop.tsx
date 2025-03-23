import { useGame } from '@/store/GameContext';
import { BoosterId, boosters } from '../Boosters/boostersConfig';

export const Shop = () => {
  const { gameState, dispatch } = useGame();

  const availableBoosters = Object.entries(boosters).filter(([boosterId]) => {
    const booster = boosters[boosterId];
    return !gameState.boosters.some(b => b.boosterId === boosterId) && 
           gameState.clicks >= booster.costs[0];
  });

  const handlePurchase = (boosterId: BoosterId) => {
    const cost = boosters[boosterId].costs[0];
    if (gameState.clicks >= cost) {
      dispatch({ type: 'UPDATE_CLICKS', payload: gameState.clicks - cost });
      dispatch({ 
        type: 'ADD_BOOSTER', 
        payload: { boosterId, level: 1 } 
      });
    }
  };

  if (availableBoosters.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-lg p-4 z-10">
      <div className="flex gap-4">
        {availableBoosters.map(([boosterId, booster]) => {
          const cost = booster.costs[0];

          return (
            <div 
              key={boosterId}
              onClick={() => handlePurchase(boosterId as BoosterId)}
              className="flex flex-col items-center aspect-square w-[120px] p-3 
                border-2 border-gray-300 cursor-pointer
                hover:border-blue-500 hover:shadow-lg
                transition-all transform hover:scale-105 active:scale-95"
            >
              <div className="text-3xl mb-2">{booster.icon}</div>
              <div className="font-bold text-sm text-center">{booster.name}</div>
              <div className="mt-auto text-xs font-medium text-blue-600">
                {cost} clicks
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
