import Divide from '@/components/divide';
import { Progress } from 'antd';
import styles from './info-card.module.css';

export interface InfoCardProps {
  heading: string;
  subHeading?: string;
  line1: string;
  line2: string;
  line3: string;
  completePercentage: number;
}
export default function InfoCard({
  heading,
  subHeading,
  line1,
  line2,
  line3,
  completePercentage
}: InfoCardProps) {
  return (
    <div className={styles.component}>
      <label className={styles.heading}>{heading}</label>
      {subHeading ? (
        <label className={`${styles.subHeading}`}>{heading}</label>
      ) : null}
      <label className={`${styles.line}`}>{line1}</label>
      <label className={`${styles.line}`}>{line2}</label>
      <label className={`${styles.line}`}>{line3}</label>
      <Progress percent={completePercentage}></Progress>
    </div>
  );
}
