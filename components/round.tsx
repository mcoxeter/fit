import { useEffect } from 'react';
import { IWorkout } from '../pages/api/workouts';
import Button from './button';
import InfoCard from './info-card';
import { stateType, IStateProps } from '../pages/workout/[id]';

export interface RoundProps extends IStateProps {}
export function Round(props: RoundProps) {
  const completePercentage = (100 / 2) * props.elapsed;

  useEffect(() => {
    if (completePercentage >= 100) {
      props.onStateChange('PreExercise');
    }
  }, [completePercentage]);

  useEffect(() => {
    props.onStatusMessage(`Round ${props.roundIndex}`);
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
        heading={`Round ${props.roundIndex}`}
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
