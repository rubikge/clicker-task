import { BoosterId } from "../components/Boosters/boostersConfig";
import { GameState } from "./GameContext";

export type GameAction = 
  | { type: 'UPDATE_CLICKS'; payload: number }
  | { type: 'UPGRADE_BOOSTER'; payload: { boosterId: BoosterId } }
  | { type: 'ADD_BOOSTER'; payload: { boosterId: BoosterId; level: number } }
  | { type: 'REMOVE_BOOSTER'; payload: { boosterId: BoosterId } };

export const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'UPDATE_CLICKS':
      return {
        ...state,
        clicks: action.payload
      };

    case 'UPGRADE_BOOSTER': {
      const boosterIndex = state.boosters.findIndex(b => b.boosterId === action.payload.boosterId);
      if (boosterIndex === -1) return state;

      return {
        ...state,
        boosters: state.boosters.map((booster, index) => 
          index === boosterIndex 
            ? { ...booster, level: booster.level + 1 }
            : booster
        )
      };
    }

    case 'ADD_BOOSTER':
      // Проверяем, нет ли уже такого бустера
      if (state.boosters.some(b => b.boosterId === action.payload.boosterId)) {
        return state;
      }

      return {
        ...state,
        boosters: [
          ...state.boosters,
          { boosterId: action.payload.boosterId, level: action.payload.level }
        ]
      };

    case 'REMOVE_BOOSTER':
      return {
        ...state,
        boosters: state.boosters.filter(b => b.boosterId !== action.payload.boosterId)
      };

    default:
      return state;
  }
}; 