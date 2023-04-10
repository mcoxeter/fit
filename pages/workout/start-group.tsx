import { useEffect } from 'react';
import Button from './button';
import InfoCard from './info-card';
import { IStateProps } from './[id]';

export interface StartGroupProps extends IStateProps {}
export function StartGroup(props: StartGroupProps) {
  const group = props.workout?.groups[props.groupIndex - 1];
  const completePercentage = (100 / 5) * props.elapsed;

  useEffect(() => {
    if (completePercentage >= 100) {
      props.onStateChange(group?.rounds ?? 0 > 1 ? 'Round' : 'PreExercise');
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
        heading={group?.name ?? ''}
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
