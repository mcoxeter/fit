import Divide from '@/components/divide';
import { Button, Space, Typography } from 'antd';

export interface HeaderProps {
  workoutName: string;
  onStateChange: (state: stateType) => void;
  state: stateType;
}

export type stateType = 'Stop' | 'Start' | 'Pause' | 'Resume';
export default function Header({
  workoutName,
  onStateChange,
  state
}: HeaderProps) {
  return (
    <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'baseline' }}>
        <Typography.Title level={3}>{workoutName}</Typography.Title>
        <Button
          type='primary'
          onClick={() => onStateChange(getNextState(state))}
        >
          {getNextState(state)}
        </Button>
        {state === 'Pause' ? (
          <Button type='primary' onClick={() => onStateChange('Stop')}>
            Stop
          </Button>
        ) : null}
      </div>
      <Divide />
    </div>
  );
}

function getNextState(state: stateType): stateType {
  switch (state) {
    case 'Stop':
      return 'Start';
    case 'Start':
    case 'Resume':
      return 'Pause';
    case 'Pause':
      return 'Resume';
  }
}
