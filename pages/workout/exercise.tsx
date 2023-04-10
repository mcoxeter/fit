import { useEffect } from 'react';
import { IWorkout } from '../api/workouts';
import Button from './button';
import InfoCard from './info-card';
import { stateType, IStateProps } from './[id]';

export interface ExerciseProps extends IStateProps {}
export function Exercise(props: ExerciseProps) {
  const exercise =
    props.workout?.groups[props.groupIndex - 1].exercises[
      props.exerciseIndex - 1
    ];
  const duration = exercise?.duration ?? 0;
  const name = exercise?.name ?? '';
  const message = `${name} ${duration} seconds`;
  const completePercentage = (100 / duration) * props.elapsed;

  useEffect(() => {
    if (completePercentage >= 100) {
      props.onStateChange('PostExercise');
    }
  }, [completePercentage]);

  useEffect(() => {
    props.onStatusMessage(message);
  }, []);

  return (
    <div
      style={{
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <InfoCard
        heading={message}
        line1={exercise?.equipment[0] ?? ''}
        line2={exercise?.equipment[1] ?? ''}
        line3={exercise?.equipment[2] ?? ''}
        completePercentage={Math.round(completePercentage)}
      />
      <Button
        text='Pause'
        onClick={() => props.onStateChange('Paused')}
        variant='Success'
      />
    </div>
  );
}
