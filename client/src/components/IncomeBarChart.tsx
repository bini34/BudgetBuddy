"use client"
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts'
import { getIncomeByYear } from '@/lib/income'
interface IncomeEntry {
  id: string
  source: string
  amount: number
  date: string
}

interface IncomeBarChartProps {
  incomeData: IncomeEntry[]
}

export function IncomeBarChart() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [incomeData, setIncomeData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getIncomeByYear(year);
      setIncomeData(data.data);
    };
    
    fetchData();
  }, [year]);

  const barChartData = incomeData?.monthlyBreakdown 
    ? Object.entries(incomeData.monthlyBreakdown).map(([month, data]: [string, any]) => ({
        month: new Date(2024, parseInt(month), 1).toLocaleString('default', { month: 'short' }),
        total: data.total
      }))
    : [];

  return (
    <Card className="flex flex-col gap-4">
        
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{incomeData?.year} Income Trends</CardTitle>
        <CardDescription className="text-4xl font-bold"><div className="text-4xl font-bold">${incomeData?.yearlyTotal} ETB</div></CardDescription>
      </CardHeader>
      <CardContent className="h-[500px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={barChartData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
