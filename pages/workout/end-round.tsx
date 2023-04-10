import { useEffect } from 'react';
import Button from './button';
import InfoCard from './info-card';
import { IStateProps } from './[id]';

export interface EndRoundProps extends IStateProps {}
export function EndRound(props: EndRoundProps) {
  const groups = props.workout?.groups ?? [];
  const groupIndex = props.groupIndex - 1;
  const duration = groups[groupIndex].restBetweenRounds;
  const completePercentage = (100 / duration) * props.elapsed;
  const isLastRound = props.roundIndex >= groups[groupIndex].rounds;

  useEffect(() => {
    if (completePercentage >= 100) {
      if (isLastRound) {
        props.onStateChange('EndGroup');
        return;
      }
      props.onStateChange('Round');
    }
  }, [completePercentage]);

  useEffect(() => {
    props.onStatusMessage(`End of round ${props.roundIndex}`);
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
        heading={`End of round ${props.roundIndex}`}
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
