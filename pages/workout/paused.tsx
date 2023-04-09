import { IWorkout } from '../api/workouts';
import { stateType, IStateProps } from './[id]';

export interface PausedProps extends IStateProps {}
export function Paused(props: PausedProps) {
  return <div>Paused</div>;
}
