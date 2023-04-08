import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { IWorkout, IWorkouts } from '../api/workouts';
import Header, { stateType } from './header';

export default function Workout() {
  const {
    query: { id }
  } = useRouter();

  const [data, setData] = useState<IWorkout | null>();
  const [state, setState] = useState<stateType>('Stop');

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
      <Header
        workoutName={data?.name ?? ''}
        state={state}
        onStateChange={(newState) => setState(newState)}
      />
    </div>
  );
}
