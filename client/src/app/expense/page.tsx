"use client"

import Layout from "@/components/layout"
import Header from "@/components/header"
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExpenseForm } from "@/components/ExpenseForm"
import { ExpenseTable } from "@/components/ExpenseTable"
interface Expense {
    id: string
    category: string
    subCategory: string
    amount: number
    date: Date
    notes: string
  }
  
export default function Page(){
    const [expenses, setExpenses] = useState<Expense[]>([])

    const handleAddExpense = (newExpense: Expense) => {
      setExpenses([...expenses, newExpense])
    }
  
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  
    
    return <Layout>
        <div className="w-full flex flex-col gap-4">
            <Header headerName="Expense" link="/expense" linkName="Expense" />

            <main className="grid gap-8 md:grid-cols-2">
            <ExpenseForm onAddExpense={handleAddExpense} />
            <Card>
            <CardHeader>
                <CardTitle>Expense Overview</CardTitle>
            </CardHeader>
            <CardContent>
                <ExpenseTable expenses={expenses} />
            </CardContent>
            </Card>
            </main>
        </div>
    </Layout>
}