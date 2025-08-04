'use client';
import * as React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {Button} from '@/components/ui/button';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  ReferenceLine
} from 'recharts';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {classData} from '@/data/classes';

const calculateAverages = () => {
  return classData.classes.map((classroom) => {
    const subjectAverages: Record<string, number> = {};
    let totalStudents = classroom.students.length;

    classData.subjects.forEach((subject) => {
      subjectAverages[subject] = 0;
    });

    classroom.students.forEach((student) => {
      classData.subjects.forEach((subject) => {
        subjectAverages[subject] += student.scores[
          subject as keyof typeof student.scores
        ] as number;
      });
    });

    classData.subjects.forEach((subject) => {
      subjectAverages[subject] = parseFloat(
        (subjectAverages[subject] / totalStudents).toFixed(1)
      );
    });

    return {
      id: classroom.id,
      name: classroom.name,
      ...subjectAverages,
      overall: parseFloat(
        (
          Object.values(subjectAverages).reduce((a, b) => a + b, 0) /
          classData.subjects.length
        ).toFixed(1)
      )
    };
  });
};

const getBarColor = (score: number | string): string => {
  if (Number(score) >= 80) return 'var(--primary)';
  if (Number(score) >= 60) return 'var(--destructive)';
  return '#ef4444';
};

export default function ClassComparisonDashboard() {
  const [selectedSubject, setSelectedSubject] =
    React.useState<string>('overall');
  const [selectedView, setSelectedView] = React.useState<string>('chart');
  const classAverages = calculateAverages();

  const chartData = classAverages.map((classroom) => ({
    name: classroom.name,
    [selectedSubject]: classroom[selectedSubject as keyof typeof classroom]
  }));

  const subjectOptions = [
    {value: 'overall', label: 'Overall'},
    ...classData.subjects.map((subject) => ({
      value: subject,
      label: subject.charAt(0).toUpperCase() + subject.slice(1)
    }))
  ];

  return (
    <>
      <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 ">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Class Performance Dashboard</h1>
            <p className="text-muted-foreground">
              Compare academic performance across classes
            </p>
          </div>
          <div className="flex gap-4">
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                {subjectOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="outline" className="ml-auto">
              Export Report
            </Button>
          </div>
        </div>

        <Tabs value={selectedView} onValueChange={setSelectedView}>
          <TabsList>
            <TabsTrigger value="chart">Chart View</TabsTrigger>
            <TabsTrigger value="table">Table View</TabsTrigger>
            <TabsTrigger value="details">Detailed Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="chart">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">
                      Class Performance Comparison
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {selectedSubject === 'overall'
                        ? 'Average scores across all subjects'
                        : `Performance in ${
                            selectedSubject.charAt(0).toUpperCase() +
                            selectedSubject.slice(1)
                          }`}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      Max: 100
                    </span>
                    <div className="h-4 w-4 rounded-full bg-[#3b82f6]" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="h-[400px] pl-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    layout="vertical" // Horizontal bars often work better for class comparisons
                    margin={{
                      top: 20,
                      right: 30,
                      left: 40, // More space for class names
                      bottom: 20
                    }}
                    barCategoryGap={20}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      horizontal={true}
                      vertical={false}
                      stroke="#f3f4f6"
                    />
                    <XAxis
                      type="number"
                      domain={[0, 100]}
                      tickCount={6}
                      tick={{fill: '#6b7280'}}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      dataKey="name"
                      type="category"
                      width={80}
                      tick={{fill: '#111827'}}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: '0.5rem',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                        border: 'none'
                      }}
                      formatter={(value) => [
                        `${value}%`,
                        selectedSubject === 'overall'
                          ? 'Overall Score'
                          : 'Score'
                      ]}
                      labelFormatter={(label) => `Class: ${label}`}
                    />
                    <Bar
                      dataKey={selectedSubject}
                      name={
                        selectedSubject === 'overall'
                          ? 'Overall Score'
                          : `${selectedSubject} Score`
                      }
                      radius={[0, 4, 4, 0]} // Rounded right corners only
                      animationDuration={1500}
                    >
                      {chartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={getBarColor(entry[selectedSubject])}
                        />
                      ))}
                    </Bar>
                    <ReferenceLine
                      x={70}
                      stroke="#9ca3af"
                      strokeDasharray="3 3"
                      label={{
                        value: 'Target',
                        position: 'insideTopRight',
                        fill: '#9ca3af',
                        fontSize: 12
                      }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
              <div className="px-6 pb-4 text-xs text-muted-foreground">
                <p>
                  Hover over bars for details. Click legend to toggle
                  visibility.
                </p>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="table">
            <Card className="@container/card">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                  Class Performance Data
                </CardTitle>
                <CardDescription>
                  Detailed scores by subject area
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableCaption>Average scores by class</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Class</TableHead>
                      {classData.subjects.map((subject) => (
                        <TableHead key={subject}>
                          {subject.charAt(0).toUpperCase() + subject.slice(1)}
                        </TableHead>
                      ))}
                      <TableHead className="text-right">Overall</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {classAverages.map((classroom) => (
                      <TableRow key={classroom.id}>
                        <TableCell className="font-medium">
                          {classroom.name}
                        </TableCell>
                        {classData.subjects.map((subject) => (
                          <TableCell key={`${classroom.id}-${subject}`}>
                            {classroom[subject as keyof typeof classroom]}
                          </TableCell>
                        ))}
                        <TableCell className="text-right font-bold">
                          {classroom.overall}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle>Class Performance Details</CardTitle>
                <CardDescription>
                  View individual student scores by class
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue={classData.classes[0].id}>
                  <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
                    {classData.classes.map((classroom) => (
                      <TabsTrigger key={classroom.id} value={classroom.id}>
                        {classroom.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {classData.classes.map((classroom) => (
                    <TabsContent key={classroom.id} value={classroom.id}>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Student</TableHead>
                            {classData.subjects.map((subject) => (
                              <TableHead key={subject} className="text-right">
                                {subject.charAt(0).toUpperCase() +
                                  subject.slice(1)}
                              </TableHead>
                            ))}
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {classroom.students.map((student) => (
                            <TableRow key={student.id}>
                              <TableCell className="font-medium">
                                {student.name}
                              </TableCell>
                              {classData.subjects.map((subject) => (
                                <TableCell
                                  key={`${student.id}-${subject}`}
                                  className="text-right"
                                >
                                  {
                                    student.scores[
                                      subject as keyof typeof student.scores
                                    ]
                                  }
                                </TableCell>
                              ))}
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
