import { useEffect } from 'react';
import Button from './button';
import InfoCard from './info-card';
import { IStateProps } from './[id]';

export interface StartMessageProps extends IStateProps {}
export function StartMessage(props: StartMessageProps) {
  const completePercentage = (100 / 20) * props.elapsed;

  useEffect(() => {
    if (completePercentage >= 100) {
      props.onStateChange('BeginWorkout');
    }
  }, [completePercentage]);

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
        heading={props.workout?.startMessages ?? ''}
        line1={'Apple Watch'}
        line2={''}
        line3=''
        completePercentage={Math.round(completePercentage)}
      />
      <Button
        text='Ready'
        onClick={() => props.onStateChange('BeginWorkout')}
        variant='Success'
      />
    </div>
  );
}
