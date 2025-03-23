import { AutoSquare } from './AutoSquare/AutoSquare';
import { BoosterProps } from './Booster';
import { MainButton } from './MainButton/MainButton';
import { PetCircle } from './PetCircle/PetCircle';

export interface BoosterParams {
  component: React.FC<BoosterProps>;
  top: number;
  left: number;
  name: string;
  description: string;
  icon: string;
  costs: number[];
}

export type BoosterId = 'mainButton' | 'autoSquare' | 'petCircle';

export const boosters: Record<string, BoosterParams> = {
  mainButton: {
    component: MainButton,
    name: 'Click Button',
    description: 'Main clicking button. Each level increases clicks per click!',
    icon: '👆',
    top: 40,
    left: 50,
    costs: [0, 25, 100, 250, 1000, 2500],
  },
  autoSquare: {
    component: AutoSquare,
    name: 'Auto Square',
    description: 'Automatically generates clicks every second',
    icon: '⬛',
    top: 75,
    left: 75,
    costs: [10, 50, 100, 500, 1000],
  },
  petCircle: {
    component: PetCircle,
    name: 'Pet Circle',
    description: 'A friendly circle that generates clicks when petted',
    icon: '⭕',
    top: 25,
    left: 25,
    costs: [15, 75, 150, 750, 1500],
  }
}; 