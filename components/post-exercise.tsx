import { useEffect } from 'react';
import Button from './button';
import InfoCard from './info-card';
import { IStateProps } from '../pages/workout/[id]';

export interface PostExerciseProps extends IStateProps {}
export function PostExercise(props: PostExerciseProps) {
  const groups = props.workout?.groups ?? [];
  const groupIndex = props.groupIndex - 1;
  const exerciseIndex = props.exerciseIndex - 1;
  const exercises = groups[groupIndex].exercises ?? [];

  const exercise = exercises[exerciseIndex];
  const restTime = exercise?.rest ?? 0;
  const completePercentage = (100 / restTime) * props.elapsed;
  const message = restTime > 0 ? `Rest ${restTime} seconds` : '';

  const isLastExercise = exerciseIndex >= exercises.length - 1;

  useEffect(() => {
    if (completePercentage >= 100) {
      if (isLastExercise) {
        props.onStateChange('EndRound');
        return;
      }
      props.onStateChange('PreExercise');
    }
  }, [completePercentage]);

  useEffect(() => {
    if (message !== '') {
      props.onStatusMessage(message);
    }
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
        line1={''}
        line2={''}
        line3={''}
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
