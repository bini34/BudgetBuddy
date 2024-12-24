"use client"

import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

// Expense data (simulating a budget tracker)
const expenseData = [
  { date: "2024-04-01", food: 50, utilities: 80, transportation: 20 },
  { date: "2024-04-02", food: 30, utilities: 60, transportation: 25 },
  { date: "2024-04-03", food: 70, utilities: 100, transportation: 35 },
  { date: "2024-04-04", food: 40, utilities: 90, transportation: 30 },
  { date: "2024-04-05", food: 60, utilities: 85, transportation: 40 },
  { date: "2024-04-06", food: 55, utilities: 75, transportation: 28 },
  { date: "2024-04-07", food: 65, utilities: 95, transportation: 33 },
  { date: "2024-04-08", food: 45, utilities: 70, transportation: 22 },
]

// Configuration for expenses chart
const chartConfig = {
  food: {
    label: "Food",
    color: "hsl(var(--chart-1))",
  },
  utilities: {
    label: "Utilities",
    color: "hsl(var(--chart-2))",
  },
  transportation: {
    label: "Transportation",
    color: "hsl(var(--chart-3))",
  },
}

// Calculate total expenses for each date
const totalExpenseData = expenseData.map((entry) => ({
  date: entry.date,
  total: entry.food + entry.utilities + entry.transportation,
}));

export function AreaChartComponent() {
  return (
    <Card className="w-full p-4">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Budget Tracker - Total Expense Trends</CardTitle>
          <CardDescription>
            View your total expenses over the past month
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={totalExpenseData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="expenses"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            <Line
              dataKey="total"
              type="monotone"
              stroke="hsl(var(--chart-1))"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
