// chartData.ts

import {classData} from '@/data/classes';

const generateChartData = () => {
  const baseDate = new Date('2025-08-03');
  const chartData = [];

  for (let i = 0; i < 10; i++) {
    const date = new Date(baseDate);
    date.setDate(date.getDate() - i * 7); // Weekly intervals

    const room201Avg = getClassAverage('room-201');
    const room202Avg = getClassAverage('room-202');

    chartData.unshift({
      date: date.toISOString().split('T')[0],
      room201: room201Avg,
      room202: room202Avg
    });
  }

  return chartData;
};

const getClassAverage = (roomId: string) => {
  const room = classData.classes.find((c) => c.id === roomId);
  if (!room) return 0;

  const studentCount = room.students.length;
  const totalScore = room.students.reduce((acc, s) => {
    const avg = (s.scores.math + s.scores.english + s.scores.science) / 3;
    return acc + avg;
  }, 0);

  return Math.round(totalScore / studentCount);
};

export const chartData = generateChartData();
