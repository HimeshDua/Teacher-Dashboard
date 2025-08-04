'use client';

import * as React from 'react';
import {IconTrendingDown, IconTrendingUp} from '@tabler/icons-react';

import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';

import {classData} from '@/data/classes';
export const description = 'Class-wise academic progress';

const cardStats = classData.classes.map((classroom) => {
  const totalScores = classroom.students.reduce(
    (acc, student) => {
      acc.math += student.scores.math;
      acc.english += student.scores.english;
      acc.science += student.scores.science;
      return acc;
    },
    {math: 0, english: 0, science: 0}
  );

  const studentCount = classroom.students.length;

  const avgMath = (totalScores.math / studentCount).toFixed(1);
  const avgEnglish = (totalScores.english / studentCount).toFixed(1);
  const avgScience = (totalScores.science / studentCount).toFixed(1);
  const totalAvg = ((+avgMath + +avgEnglish + +avgScience) / 3).toFixed(1);

  return {
    title: classroom.name,
    value: `${totalAvg}%`,
    description: `Math: ${avgMath}%, Eng: ${avgEnglish}%, Sci: ${avgScience}%`,
    subtext: `${studentCount} students`,
    trend: parseFloat(totalAvg) >= 75 ? 'Up' : 'Down',
    icon:
      parseFloat(totalAvg) >= 75 ? (
        <IconTrendingUp className="h-4 w-4" />
      ) : (
        <IconTrendingDown className="h-4 w-4" />
      )
  };
});

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {cardStats.map((stat, i) => (
        <Card className="@container/card" key={i}>
          <CardHeader>
            <CardDescription>{stat.title}</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {stat.value}
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                {stat.icon} {stat.trend}
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              {stat.description} {stat.icon}
            </div>
            <div className="text-muted-foreground">{stat.subtext}</div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
