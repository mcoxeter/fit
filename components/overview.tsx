import { totalDuration } from '../pages';
import { IWorkout } from '../pages/api/workouts';
import InfoCard from './info-card';

export interface OverviewProps {
  workout?: IWorkout;
}
export default function Overview({ workout }: OverviewProps) {
  if (!workout) {
    return null;
  }
  const duration = totalDuration(workout);
  return (
    <InfoCard
      completePercentage={0}
      heading={workout.name}
      subHeading={`${duration} Minutes`}
      line1={workout.equipment[0]}
      line2={workout.equipment[1]}
      line3={workout.equipment[2]}
    />
  );
}
