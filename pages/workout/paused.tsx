import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Button from './button';
import InfoCard from './info-card';
import { IStateProps } from './[id]';

export interface PausedProps extends IStateProps {}
export function Paused(props: PausedProps) {
  const router = useRouter();
  const [elapsed, setElapsed] = useState(0);
  const completePercentage = (100 / 30) * elapsed;

  useEffect(() => {
    const handle = setInterval(() => {
      setElapsed((prev) => prev + 1);
      if (elapsed + 1 > 20) {
        props.onStateChange('Resume');
      }
    }, 1000);
    return () => {
      clearInterval(handle);
    };
  }, [elapsed]);

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
        heading={'Workout Paused'}
        line1={''}
        line2={''}
        line3=''
        completePercentage={Math.round(completePercentage)}
      />
      <div
        style={{
          padding: '10px',
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Button
          text='Resume'
          onClick={() => props.onStateChange('Resume')}
          variant='Info'
        />
        <Button
          text='Quit'
          onClick={() => router.push('/')}
          variant='Warning'
        />
      </div>
    </div>
  );
}
