"use client"
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { IncomeForm } from "@/components/IncomeForm"
import { IncomeCharts } from "@/components/IncomeCharts"
import Layout from "@/components/layout"
import Header from "@/components/header"
import { IncomeBarChart } from '@/components/IncomeBarChart'
import { getUserIncomes } from '@/lib/income'
interface IncomeEntry {
    id: string
    source: string
    amount: number
    month: number
    year: number
  }
export default function Page(){
    const [incomeEntries, setIncomeEntries] = useState<IncomeEntry[]>([])

    useEffect(() => {
        const fetchIncome = async () => {
            try {
                const income = await getUserIncomes();
                if (income?.data) {
                  console.log("income for ", income.data)
                    setIncomeEntries(income.data);
                }
            } catch (error) {
                console.error('Error fetching income:', error);
            }
        }
        fetchIncome();
    }, []);

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
                  <li key={entry._id} className="flex justify-between items-center">
                    <span>{entry.source}</span>
                    <span className="font-semibold">${entry.amount.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="flex justify-end w-full">
              <p className="text-sm text-gray-500 font-bold">Total Income: ${totalIncome.toFixed(2)}</p>
            </CardFooter>
          </Card>
        </div>
        <IncomeCharts incomeData={incomeEntries} />
            </main>
          <IncomeBarChart />

        </div>
    </Layout>
}