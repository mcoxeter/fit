import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Button from './button';
import InfoCard from './info-card';
import { IStateProps } from './[id]';

export interface EndWorkoutProps extends IStateProps {}
export function EndWorkout(props: EndWorkoutProps) {
  const duration = 2;
  const message = `Workout Complete`;
  const completePercentage = (100 / duration) * props.elapsed;

  useEffect(() => {
    if (completePercentage >= 100) {
      props.onStateChange('EndMessage');
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
    </div>
  );
}
