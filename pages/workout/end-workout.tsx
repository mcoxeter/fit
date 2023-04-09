import { IWorkout } from '../api/workouts';
import { stateType, IStateProps } from './[id]';

export interface EndWorkoutProps extends IStateProps {}
export function EndWorkout(props: EndWorkoutProps) {
  return <div>EndWorkout</div>;
}
