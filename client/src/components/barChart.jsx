"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export default function ExampleBarChart() {
    const chartData = [
        { month: "January", income: 186, expense: 80 },
        { month: "February", income: 305, expense: 200 },
        { month: "March", income: 237, expense: 120 },
        { month: "April", income: 73, expense: 190 },
        { month: "May", income: 209, expense: 130 },
        { month: "June", income: 214, expense: 140 },
      ]
      
      const chartConfig = {
        income: {
          label: "Income",
          color: "#4CAF50",
        },
        expense: {
          label: "Expense",
          color: "red",
        },
      }
      
  return (
    <Card className="w-full p-4">
      <CardHeader className="flex  w-full">
        <div className="flex w-full justify-between">
        <div className="flex flex-col gap-2">
          <CardTitle>Bar Chart - Multiple</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </div>
        <div className="flex gap-2 font-medium leading-none">
        h gvghgc<TrendingUp className="h-4 w-4" />
        </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="income" fill="#4CAF50" radius={4} />
            <Bar dataKey="expense" fill="#F44336" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
