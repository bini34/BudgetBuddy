"use client"
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { IncomeForm } from "@/components/IncomeForm"
import { IncomeCharts } from "@/components/IncomeCharts"
import Layout from "@/components/layout"
import Header from "@/components/header"

interface IncomeEntry {
    id: string
    source: string
    amount: number
    date: string
  }
export default function Page(){
    const [incomeEntries, setIncomeEntries] = useState<IncomeEntry[]>([])

    const handleAddIncome = (newIncome: IncomeEntry) => {
      setIncomeEntries([...incomeEntries, newIncome])
    }
  
    const totalIncome = incomeEntries.reduce((sum, entry) => sum + entry.amount, 0)
    return <Layout>
        <div className="w-full flex flex-col gap-4">
           <Header headerName="Income" link="/income" linkName="Income" />
            <main className="grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
          <IncomeForm onAddIncome={handleAddIncome} />
          <Card>
            <CardHeader>
              <CardTitle>Income Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {incomeEntries.map((entry) => (
                  <li key={entry.id} className="flex justify-between items-center">
                    <span>{entry.source}</span>
                    <span className="font-semibold">${entry.amount.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
        <IncomeCharts incomeData={incomeEntries} />
            </main>
        </div>
    </Layout>
}