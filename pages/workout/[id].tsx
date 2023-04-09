import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { IWorkout, IWorkouts } from '../api/workouts';
import Button from './button';

export type stateType = 'Stopped' | 'Started' | 'Paused';
export default function Workout() {
  const {
    query: { id }
  } = useRouter();

  const [data, setData] = useState<IWorkout | null>();
  const [state, setState] = useState<stateType>('Stopped');
  const [elapsed, setElapsed] = useState(0);
  const [exerciseIndex, setExerciseIndex] = useState(0);

  useEffect(() => {
    const handle = setInterval(() => {
      if (state === 'Started') {
        setElapsed((prev) => prev + 1);
      }
      if (state === 'Stopped') {
        setElapsed(0);
      }
    }, 1000);
    return () => {
      clearInterval(handle);
    };
  }, [state]);

  useEffect(() => {
    async function getData() {
      const resp = await fetch('/api/workouts');
      const data = (await resp.json()) as IWorkouts;
      if (data) {
        setData(data.workouts[id as any as number]);
      }
    }
    if (id) {
      getData();
    }
  }, [id]);

  return (
    <div>
      <Button
        text={getButtonText(state, elapsed)}
        onClick={() => setState(getNextState(state))}
        variant={state === 'Paused' ? 'Info' : 'Success'}
      />
      {state === 'Paused' ? (
        <Button
          text={'Quit'}
          variant='Warning'
          onClick={() => {
            setState('Stopped');
            setExerciseIndex(0);
          }}
        ></Button>
      ) : null}
    </div>
  );
}

function getNextState(state: stateType): stateType {
  switch (state) {
    case 'Stopped':
    case 'Paused':
      return 'Started';
    case 'Started':
      return 'Paused';
  }
}

function getButtonText(state: stateType, elapsed: number): string {
  switch (state) {
    case 'Stopped':
      return 'Start';
    case 'Started':
      return `${elapsed} secs`;
    case 'Paused':
      return 'Resume';
  }
}
