'use client';
import * as React from 'react';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import {Area, AreaChart, CartesianGrid, XAxis} from 'recharts';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {ToggleGroup, ToggleGroupItem} from '@/components/ui/toggle-group';
import {useIsMobile} from '@/hooks/use-mobile';
import {classData} from '@/data/classes';

const generateChartData = () => {
  const data = [];
  const today = new Date();
  const daysToGenerate = 90;

  for (let i = daysToGenerate; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const item: any = {
      date: date.toISOString().split('T')[0]
    };
    classData.classes.forEach((classroom) => {
      const roomKey = `room${classroom.id.split('-')[1]}`;
      const randomScore = Math.floor(Math.random() * (90 - 60 + 1)) + 60;
      item[roomKey] = randomScore;
    });
    data.push(item);
  }
  return data;
};

const chartData = generateChartData();

// This function dynamically generates the chart configuration object.
const generateChartConfig = () => {
  const config: ChartConfig = {};

  classData.classes.forEach((classroom, index) => {
    // Extract the room number from the id (e.g., 'room-201' -> '201')
    const roomKey = `room${classroom.id.split('-')[1]}`;
    config[roomKey] = {
      label: `${classroom.name} Avg`,
      color: `var(--chart-${index + 1})`
    };
  });

  return config;
};

const chartConfig = generateChartConfig();

export function ChartAreaInteractive() {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState('90d');

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange('7d');
    }
  }, [isMobile]);

  const filteredData = React.useMemo(() => {
    return chartData.filter((item) => {
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
  }, [timeRange]);

  const renderGradientDefs = () => {
    return (
      <defs>
        {classData.classes.map((classroom, index) => {
          const roomKey = `room${classroom.id.split('-')[1]}`;
          return (
            <linearGradient
              key={roomKey}
              id={`fill${roomKey}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stopColor={`var(--chart-${index + 1})`}
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor={`var(--chart-${index + 1})`}
                stopOpacity={0.1}
              />
            </linearGradient>
          );
        })}
      </defs>
    );
  };

  const renderAreaComponents = () => {
    return classData.classes.map((classroom, index) => {
      const roomKey = `room${classroom.id.split('-')[1]}`;
      return (
        <Area
          key={roomKey}
          dataKey={roomKey}
          type="natural"
          fill={`url(#fill${roomKey})`}
          stroke={`var(--color-${roomKey})`}
          stackId="a"
        />
      );
    });
  };

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
            {renderGradientDefs()}
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
            {renderAreaComponents()}
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
