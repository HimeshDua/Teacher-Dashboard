'use client';

import * as React from 'react';
import {Area, AreaChart, CartesianGrid, XAxis} from 'recharts';
import {IconTrendingDown, IconTrendingUp} from '@tabler/icons-react';

import {useIsMobile} from '@/hooks/use-mobile';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {ToggleGroup, ToggleGroupItem} from '@/components/ui/toggle-group';

export const description = 'Class-wise academic progress';

const chartData = [
  {date: '2025-06-01', room201: 72, room202: 76},
  {date: '2025-06-08', room201: 75, room202: 78},
  {date: '2025-06-15', room201: 77, room202: 80},
  {date: '2025-06-22', room201: 76, room202: 81},
  {date: '2025-06-29', room201: 78, room202: 82},
  {date: '2025-07-06', room201: 79, room202: 83},
  {date: '2025-07-13', room201: 80, room202: 84},
  {date: '2025-07-20', room201: 82, room202: 85},
  {date: '2025-07-27', room201: 83, room202: 86},
  {date: '2025-08-03', room201: 84, room202: 87}
];

const chartConfig = {
  room201: {
    label: 'Room 201 Avg',
    color: 'var(--color-room201)'
  },
  room202: {
    label: 'Room 202 Avg',
    color: 'var(--color-room202)'
  }
} satisfies ChartConfig;

const cardStats = [
  {
    title: 'Average Score',
    value: '78%',
    trend: '+3.2%',
    icon: <IconTrendingUp />,
    description: 'Performance is improving',
    subtext: 'Across both classrooms',
    up: true
  },
  {
    title: 'Best Subject',
    value: 'Science',
    trend: '+8%',
    icon: <IconTrendingUp />,
    description: 'Highest class average',
    subtext: 'Strongest subject this term',
    up: true
  },
  {
    title: 'Room 202 Avg',
    value: '81%',
    trend: '+5%',
    icon: <IconTrendingUp />,
    description: 'Leading overall',
    subtext: 'Compared to Room 201',
    up: true
  },
  {
    title: 'Top Student',
    value: 'Ali (243 pts)',
    trend: 'Excellent',
    icon: <IconTrendingUp />,
    description: 'Highest scorer in Room 202',
    subtext: 'Across all subjects',
    up: true
  }
];

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

export function ChartAreaInteractive() {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState('90d');

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange('7d');
    }
  }, [isMobile]);

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date('2025-08-03');
    let daysToSubtract = 90;
    if (timeRange === '30d') {
      daysToSubtract = 30;
    } else if (timeRange === '7d') {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Academic Progress</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Average class scores over time
          </span>
          <span className="@[540px]/card:hidden">Score trend</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillRoom201" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-room201)"
                  stopOpacity={1.0}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-room201)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillRoom202" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-room202)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-room202)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric'
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="room201"
              type="natural"
              fill="url(#fillRoom201)"
              stroke="var(--color-room201)"
              stackId="a"
            />
            <Area
              dataKey="room202"
              type="natural"
              fill="url(#fillRoom202)"
              stroke="var(--color-room202)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
