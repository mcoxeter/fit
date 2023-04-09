import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { IWorkout, IWorkouts } from '../api/workouts';
import { BeginWorkout } from './begin-workout';
import { EndGroup } from './end-group';
import { EndWorkout } from './end-workout';
import { Exercise } from './exercise';
import { Paused } from './paused';
import { PostExercise } from './post-exercise';
import { PreExercise } from './pre-exercise';
import { StartGroup } from './start-group';
import { StartMessage } from './start-message';

export type stateType =
  | 'StartMessage'
  | 'BeginWorkout'
  | 'StartGroup'
  | 'EndGroup'
  | 'PreExercise'
  | 'Exercise'
  | 'PostExercise'
  | 'EndWorkout'
  | 'Paused';

export type timerType = 'Reset' | 'Counting' | 'Paused';
export default function Workout() {
  const {
    query: { id }
  } = useRouter();

  const [data, setData] = useState<IWorkout | undefined>();
  const [state, setState] = useState<stateType>('StartMessage');
  const [groupIndex, setGroupIndex] = useState(0);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [timerState, setTimerState] = useState<timerType>('Reset');

  useEffect(() => {
    const handle = setInterval(() => {
      if (timerState === 'Counting') {
        setElapsed((prev) => prev + 1);
      }
    }, 1000);
    return () => {
      clearInterval(handle);
    };
  }, [timerState]);

  useEffect(() => {
    if (state === 'StartMessage') {
      changeState('StartMessage');
    }
  }, [state]);

  const changeState = (newState: stateType) => {
    switch (newState) {
      case 'StartMessage':
        setElapsed(0);
        setTimerState('Counting');
        break;
      case 'BeginWorkout':
        setElapsed(0);
        setTimerState('Counting');
        break;

      case 'StartGroup':
        setElapsed(0);
        setGroupIndex((prev) => prev + 1);
        setExerciseIndex(0);
        setTimerState('Counting');
        break;
      case 'PreExercise':
        setExerciseIndex((prev) => prev + 1);
        break;
    }
    setState(newState);
  };

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

  const props: IStateProps = {
    workout: data,
    onStateChange: changeState,
    groupIndex: groupIndex,
    exerciseIndex: exerciseIndex,
    elapsed: elapsed
  };

  switch (state) {
    case 'StartMessage':
      return <StartMessage {...props} />;
    case 'BeginWorkout':
      return <BeginWorkout {...props} />;
    case 'StartGroup':
      return <StartGroup {...props} />;
    case 'EndGroup':
      return <EndGroup {...props} />;
    case 'PreExercise':
      return <PreExercise {...props} />;
    case 'Exercise':
      return <Exercise {...props} />;
    case 'PostExercise':
      return <PostExercise {...props} />;
    case 'EndWorkout':
      return <EndWorkout {...props} />;
    case 'Paused':
      return <Paused {...props} />;
  }
  return null;

  // if (state === 'Stopped') {
  //   return (
  //     <div className={`${styles.component}`}>
  //       <Overview workout={data} />
  //       <Button
  //         text={getButtonText(state, elapsed)}
  //         onClick={() => setState(getNextState(state))}
  //         variant={'Success'}
  //       />
  //     </div>
  //   );
  // }

  // return (
  //   <div>
  //     <Button
  //       text={getButtonText(state, elapsed)}
  //       onClick={() => setState(getNextState(state))}
  //       variant={state === 'Paused' ? 'Info' : 'Success'}
  //     />
  //     {state === 'Paused' ? (
  //       <Button
  //         text={'Quit'}
  //         variant='Warning'
  //         onClick={() => {
  //           setState('Stopped');
  //           setExerciseIndex(0);
  //         }}
  //       ></Button>
  //     ) : null}
  //   </div>
  // );
}

// function getNextState(state: stateType): stateType {
//   switch (state) {
//     case 'Stopped':
//     case 'Paused':
//       return 'Started';
//     case 'Started':
//       return 'Paused';
//   }
// }

// function getButtonText(state: stateType, elapsed: number): string {
//   switch (state) {
//     case 'Stopped':
//       return 'Start';
//     case 'Started':
//       return `${elapsed} secs`;
//     case 'Paused':
//       return 'Resume';
//   }
// }

export interface IStateProps {
  workout?: IWorkout;
  onStateChange: (newState: stateType) => void;
  groupIndex: number;
  exerciseIndex: number;
  elapsed: number;
}
