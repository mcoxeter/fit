import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Button from './button';
import InfoCard from './info-card';
import { IStateProps } from '../pages/workout/[id]';

export interface EndMessageProps extends IStateProps {}
export function EndMessage(props: EndMessageProps) {
  const duration = 20;
  const router = useRouter();
  const completePercentage = (100 / duration) * props.elapsed;
  const message = props.workout?.endMessage ?? '';

  useEffect(() => {
    if (completePercentage >= 100) {
      router.push('/');
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
        line1={'Apple Watch'}
        line2={''}
        line3=''
        completePercentage={Math.round(completePercentage)}
      />
      <Button
        text='Finish'
        onClick={() => router.push('/')}
        variant='Success'
      />
    </div>
  );
}
