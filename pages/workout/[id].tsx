import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { IWorkout, IWorkouts } from '../api/workouts';
import { BeginWorkout } from '../../components/begin-workout';
import { EndGroup } from '../../components/end-group';
import { EndMessage } from '../../components/end-message';
import { EndRound } from '../../components/end-round';
import { EndWorkout } from '../../components/end-workout';
import { Exercise } from '../../components/exercise';
import { Paused } from '../../components/paused';
import { PostExercise } from '../../components/post-exercise';
import { PreExercise } from '../../components/pre-exercise';
import { Round } from '../../components/round';
import { StartGroup } from '../../components/start-group';
import { StartMessage } from '../../components/start-message';

export type stateType =
  | 'StartMessage'
  | 'BeginWorkout'
  | 'StartGroup'
  | 'EndGroup'
  | 'Round'
  | 'EndRound'
  | 'PreExercise'
  | 'Exercise'
  | 'PostExercise'
  | 'EndWorkout'
  | 'Paused'
  | 'Resume'
  | 'EndMessage';

export type timerType = 'Counting' | 'Paused';
export default function Workout() {
  //const synth = window?.speechSynthesis;
  const {
    query: { id }
  } = useRouter();

  const [workout, setWorkout] = useState<IWorkout | undefined>();
  const [state, setState] = useState<stateType>('StartMessage');
  const [prevState, setPrevState] = useState<stateType>('StartMessage');
  const [groupIndex, setGroupIndex] = useState(0);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [roundIndex, setRoundIndex] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [timerState, setTimerState] = useState<timerType>('Counting');
  const [readout, setReadout] = useState<string[]>([]);

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

  useEffect(() => {
    const [message, ...rest] = readout;
    if (message) {
      window?.speechSynthesis.speak(new SpeechSynthesisUtterance(message));
      setReadout(rest);
    }
  }, [readout]);

  const changeState = (newState: stateType) => {
    switch (newState) {
      case 'StartMessage':
        setElapsed(0);
        break;
      case 'BeginWorkout':
        setElapsed(0);
        break;
      case 'StartGroup':
        setElapsed(0);
        setGroupIndex((prev) => prev + 1);
        setRoundIndex(0);
        setExerciseIndex(0);
        break;
      case 'Round':
        setElapsed(0);
        setRoundIndex((prev) => prev + 1);
        setExerciseIndex(0);
        break;
      case 'EndRound':
        setElapsed(0);
        break;
      case 'PreExercise':
        setElapsed(0);
        setExerciseIndex((prev) => prev + 1);
        break;
      case 'Paused':
        setTimerState('Paused');
        break;
      case 'Resume':
        setTimerState('Counting');
        newState = prevState;
        break;
      case 'Exercise':
        setElapsed(0);
        break;
      case 'PostExercise':
        setElapsed(0);
        break;
      case 'EndGroup':
        setElapsed(0);
        break;
      case 'EndMessage':
        setElapsed(0);
        break;
    }
    setPrevState(state);
    setState(newState);
  };

  useEffect(() => {
    async function getData() {
      const resp = await fetch('/api/workouts');
      const data = (await resp.json()) as IWorkouts;
      if (data) {
        setWorkout(data.workouts[id as any as number]);
      }
    }
    if (id) {
      getData();
    }
  }, [id]);

  if (!workout) {
    return null;
  }

  const props: IStateProps = {
    workout,
    prevState,
    onStateChange: changeState,
    onStatusMessage: (message) => {
      if (!readout.some((x) => x === message)) {
        setReadout(readout.concat(message));
      }
    },
    groupIndex,
    exerciseIndex,
    elapsed,
    roundIndex
  };

  console.log(
    state,
    `groupIndex: ${groupIndex}, exerciseIndex: ${exerciseIndex}, roundIndex: ${roundIndex}`
  );

  switch (state) {
    case 'StartMessage':
      return <StartMessage {...props} />;
    case 'BeginWorkout':
      return <BeginWorkout {...props} />;
    case 'StartGroup':
      return <StartGroup {...props} />;
    case 'EndGroup':
      return <EndGroup {...props} />;
    case 'Round':
      return <Round {...props} />;
    case 'EndRound':
      return <EndRound {...props} />;
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
    case 'EndMessage':
      return <EndMessage {...props} />;
  }
  return null;
}

export interface IStateProps {
  workout?: IWorkout;

  prevState: stateType;
  onStateChange: (newState: stateType) => void;

  onStatusMessage: (message: string) => void;

  groupIndex: number;
  exerciseIndex: number;

  roundIndex: number;
  elapsed: number;
}
