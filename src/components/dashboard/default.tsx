'use client';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {Separator} from '@/components/ui/separator';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import {useMemo} from 'react';
import {cn} from '@/lib/utils';

// Sample Data (you can replace this with fetched JSON)
import dashboardData from '@/data/dashboard.json';

export default function DashboardPage() {
  const {classes} = dashboardData;

  const globalStats = useMemo(() => {
    const allScores = classes.flatMap((cls) =>
      cls.students.flatMap((stu) => Object.values(stu.scores))
    );
    const average =
      allScores.reduce((acc, score) => acc + score, 0) / allScores.length;

    const subjectTotals: Record<string, number[]> = {
      math: [],
      english: [],
      science: []
    };
    classes.forEach((cls) => {
      cls.students.forEach((stu) => {
        Object.entries(stu.scores).forEach(([subject, score]) => {
          subjectTotals[subject].push(score);
        });
      });
    });
    const subjectAverages = Object.entries(subjectTotals).map(
      ([subject, scores]) => ({
        subject,
        avg:
          Math.round(
            (scores.reduce((acc, s) => acc + s, 0) / scores.length) * 10
          ) / 10
      })
    );

    const bestSubject = subjectAverages.reduce((prev, curr) =>
      curr.avg > prev.avg ? curr : prev
    );

    return {
      avgScore: Math.round(average),
      bestSubject
    };
  }, [classes]);

  const classComparison = useMemo(() => {
    return classes.map((cls) => {
      const allScores = cls.students.flatMap((stu) =>
        Object.values(stu.scores)
      );
      const avg =
        Math.round(
          (allScores.reduce((a, b) => a + b, 0) / allScores.length) * 10
        ) / 10;
      return {
        name: cls.name,
        average: avg
      };
    });
  }, [classes]);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Overall Average</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {globalStats.avgScore}%
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Best Performing Subject</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold capitalize">
            {globalStats.bestSubject.subject} ({globalStats.bestSubject.avg}%)
          </CardContent>
        </Card>
      </div>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Class Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={classComparison}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="average" fill="#4f46e5" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Separator />

      <Tabs defaultValue="math">
        <TabsList>
          <TabsTrigger value="math">Math</TabsTrigger>
          <TabsTrigger value="english">English</TabsTrigger>
          <TabsTrigger value="science">Science</TabsTrigger>
        </TabsList>

        {['math', 'english', 'science'].map((subject) => {
          const subjectData = classes.map((cls) => {
            const scores = cls.students.map((s: any) => s.scores[subject]);
            const avg =
              Math.round(
                (scores.reduce((a, b) => a + b, 0) / scores.length) * 10
              ) / 10;
            return {name: cls.name, average: avg};
          });

          return (
            <TabsContent key={subject} value={subject}>
              <Card>
                <CardHeader>
                  <CardTitle>
                    {subject.charAt(0).toUpperCase() + subject.slice(1)}{' '}
                    Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={subjectData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar
                        dataKey="average"
                        fill="#059669"
                        radius={[6, 6, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
