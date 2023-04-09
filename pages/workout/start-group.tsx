import { useEffect } from 'react';
import InfoCard from './info-card';
import { IStateProps } from './[id]';

export interface StartGroupProps extends IStateProps {}
export function StartGroup(props: StartGroupProps) {
  const group = props.workout?.groups[props.groupIndex - 1];
  const completePercentage = (100 / 5) * props.elapsed;

  useEffect(() => {
    if (completePercentage >= 100) {
      props.onStateChange('PreExercise');
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
        heading={group?.name ?? ''}
        line1={''}
        line2={''}
        line3={''}
        completePercentage={completePercentage}
      />
    </div>
  );
}
