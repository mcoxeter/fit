import { useEffect } from 'react';
import Button from './button';
import InfoCard from './info-card';
import { IStateProps } from './[id]';

export interface BeginWorkoutProps extends IStateProps {}
export function BeginWorkout(props: BeginWorkoutProps) {
  const completePercentage = (100 / 20) * props.elapsed;

  useEffect(() => {
    if (completePercentage >= 100) {
      props.onStateChange('StartGroup');
    }
  }, [completePercentage]);

  return (
    <div
      style={{
        padding: '10px',
        display: 'flex',
        justifyContent: 'space-between'
      }}
    >
      <InfoCard
        heading={props.workout?.name ?? ''}
        line1={props.workout?.equipment[0] ?? ''}
        line2={props.workout?.equipment[1] ?? ''}
        line3={props.workout?.equipment[2] ?? ''}
        completePercentage={completePercentage}
      />
      <Button
        text='Ready'
        onClick={() => props.onStateChange('StartGroup')}
        variant='Success'
      />
    </div>
  );
}
