import { IWorkout } from '../api/workouts';
import { stateType, IStateProps } from './[id]';

export interface ExerciseProps extends IStateProps {}
export function Exercise(props: ExerciseProps) {
  return <div>Exercise</div>;
}
