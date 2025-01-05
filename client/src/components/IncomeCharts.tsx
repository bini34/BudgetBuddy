"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts'

interface IncomeEntry {
  id: string
  source: string
  amount: number
  date: string
}

interface IncomeChartsProps {
  incomeData: IncomeEntry[]
}

export function IncomeCharts({ incomeData }: IncomeChartsProps) {
  // Prepare data for the bar chart (income trends)
  const monthlyData = incomeData.reduce((acc, entry) => {
    const month = new Date(entry.date).toLocaleString('default', { month: 'short' })
    acc[month] = (acc[month] || 0) + entry.amount
    return acc
  }, {} as Record<string, number>)

  const barChartData = Object.entries(monthlyData).map(([month, amount]) => ({ month, amount }))

  // Prepare data for the pie chart (income breakdown)
  const sourceData = incomeData.reduce((acc, entry) => {
    acc[entry.source] = (acc[entry.source] || 0) + entry.amount
    return acc
  }, {} as Record<string, number>)

  const pieChartData = Object.entries(sourceData).map(([source, amount]) => ({ source, amount }))

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Income Trends</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barChartData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="amount" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
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
                outerRadius={80}
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
    </div>
  )
}

