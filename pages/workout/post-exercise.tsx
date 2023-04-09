import { IWorkout } from '../api/workouts';
import { stateType, IStateProps } from './[id]';

export interface PostExerciseProps extends IStateProps {}
export function PostExercise(props: PostExerciseProps) {
  return <div>PostExercise</div>;
}
