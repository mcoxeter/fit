import { useEffect } from 'react';
import Button from './button';
import InfoCard from './info-card';
import { IStateProps } from './[id]';

export interface EndGroupProps extends IStateProps {}
export function EndGroup(props: EndGroupProps) {
  const groups = props.workout?.groups ?? [];
  const groupIndex = props.groupIndex - 1;
  const duration = 5;
  const message = `End of ${groups[groupIndex].name.toLocaleLowerCase()}`;
  const completePercentage = (100 / duration) * props.elapsed;
  const isLastGroup = groupIndex >= groups.length - 1;

  useEffect(() => {
    if (completePercentage >= 100) {
      if (isLastGroup) {
        props.onStateChange('EndWorkout');
        return;
      }
      props.onStateChange('StartGroup');
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
