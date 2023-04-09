import { IWorkout } from '../api/workouts';
import { stateType, IStateProps } from './[id]';

export interface PreExerciseProps extends IStateProps {}
export function PreExercise(props: PreExerciseProps) {
  return <div>PreExercise</div>;
}
