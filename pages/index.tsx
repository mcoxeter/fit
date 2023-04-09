import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
// import styles from '@/styles/Home.module.css';
import { Button, Divider, List, Space, Tag, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { IWorkout, IWorkouts } from './api/workouts';
import Divide from '@/components/divide';
const { Title, Paragraph, Text, Link } = Typography;

export default function Home() {
  const [data, setData] = useState<IWorkouts>();

  useEffect(() => {
    async function getData() {
      const resp = await fetch('/api/workouts');
      setData(await resp.json());
    }
    getData();
  }, []);
  return (
    <Typography>
      <List
        dataSource={data?.workouts}
        renderItem={(item, workoutIndex) => {
          return (
            <List.Item>
              <Space direction='vertical'>
                <Typography.Title level={2}>
                  <Link href={`/workout/${workoutIndex}`}>{item.name}</Link>
                </Typography.Title>
                <Space size='small'>
                  {item.equipment.map((equ, i) => (
                    <Tag color={'default'} key={i}>
                      {equ}
                    </Tag>
                  ))}
                  <Tag color={'green'}>{totalDuration(item)} mins</Tag>
                </Space>
                <Divide />
              </Space>
            </List.Item>
          );
        }}
      />
    </Typography>
  );
}

export function totalDuration(workout: IWorkout): number {
  let totalDuration = 0;
  workout.groups.forEach((g) => {
    for (let round = 0; round < g.rounds; round++) {
      g.exercises.forEach((ex) => {
        totalDuration += ex.duration;
        totalDuration += ex.rest;
      });
      totalDuration += g.restBetweenRounds;
    }
  });
  return Math.round(totalDuration / 60);
}
