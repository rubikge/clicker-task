import { BoosterId, boosters } from './boostersConfig';

export interface BoosterState {
  boosterId: BoosterId;
  level: number;
}

export interface BoosterProps {
  level: number;
  nextLevelCost: number;
}

export const Booster: React.FC<BoosterState> = ({ boosterId, level }) => {
  const booster = boosters[boosterId];
  const nextLevelCost = booster.costs[level] || 0;
  const BoosterComponent = booster.component;

  return (
    <div
      className="absolute -translate-x-1/2"
      style={{ top: `${booster.top}%`, left: `${booster.left}%` }}
    >
      <BoosterComponent level={level} nextLevelCost={nextLevelCost} />
    </div>
  );
}; 