import { Booster } from '@/components/Boosters/Booster'
import { Shop } from '@/components/Shop/Shop'
import { GameContext, initialGameState, useGame } from '@/store/GameContext'
import { useMemo, useReducer } from 'react';
import { gameReducer } from './store/gameReducer';

function GameContent() {
  const { gameState } = useGame();

  return (
    <div className="flex flex-col items-center min-h-screen w-screen">
      <Shop />
      
      <h1 className="text-3xl font-bold text-blue-500 mt-44">
        My Clicker
      </h1>
      <div className="absolute top-0 left-0 w-full h-full">
        {gameState.boosters.map((booster) => (
          <Booster
            key={booster.boosterId}
            boosterId={booster.boosterId}
            level={booster.level}
          />
        ))}
      </div>            
      <div className="text-2xl font-bold mt-8">
        {gameState.clicks} clicks
      </div>
    </div>
  )
}

function App() {
  const [gameState, dispatch] = useReducer(gameReducer, initialGameState);
  const contextValue = useMemo(() => ({ gameState, dispatch }), [gameState, dispatch]);

  return (
    <GameContext.Provider value={contextValue}>
      <GameContent />
    </GameContext.Provider>
  )
}

export default App
