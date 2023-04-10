// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IWorkouts>
) {
  const data = require('./workouts.json');
  res.status(200).json(data);
}

export interface IWorkouts {
  workouts: IWorkout[];
}

export interface IWorkout {
  name: string;

  startMessage: string;
  endMessage: string;
  equipment: string[];

  groups: IExerciseGroup[];
}

export interface IExerciseGroup {
  name: string;
  rounds: number;
  restBetweenRounds: number;
  exercises: IExercise[];
}

export interface IExercise {
  name: string;
  rest: number;
  duration: number;
  equipment: string[];
}
