"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from 'recharts'

interface IncomeEntry {
  id: string
  source: string
  amount: number
  date: string
}

interface IncomePieChartProps {
  incomeData: IncomeEntry[]
}

export function IncomePieChart({ incomeData }: IncomePieChartProps) {
  const sourceData = incomeData.reduce((acc, entry) => {
    acc[entry.source] = (acc[entry.source] || 0) + entry.amount
    return acc
  }, {} as Record<string, number>)

  const pieChartData = Object.entries(sourceData).map(([source, amount]) => ({ source, amount }))

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

  return (
    <Card>
      <CardHeader>
        <CardTitle>Income Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieChartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={120}
              fill="#8884d8"
              dataKey="amount"
              label={({ source, percent }) => `${source} ${(percent * 100).toFixed(0)}%`}
            >
              {pieChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
