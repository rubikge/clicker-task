import { createContext, useContext } from 'react';
import { GameAction } from './gameReducer';
import { BoosterState } from '../components/Boosters/Booster';

export interface GameState {
  clicks: number;
  boosters: BoosterState[];
}

export const initialGameState: GameState = {
  clicks: 0,
  boosters: [
    { boosterId: 'mainButton', level: 1 },
    // { boosterId: 'autoSquare', level: 1 },
    // { boosterId: 'petCircle', level: 1 },
  ]
};

export const GameContext = createContext<{
  gameState: GameState;
  dispatch: React.Dispatch<GameAction>;
} | undefined>(undefined);


export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
} 