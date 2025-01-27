"use client"

import Layout from "@/components/layout"
import Header from "@/components/header"
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SavingsGoalForm } from "@/components/SavingsGoalForm"
import { SavingsGoalProgress } from "@/components/SavingsGoalProgress"
import { getAllSavings, updateSaving } from '@/lib/saving'
interface SavingsGoal {
  id: string
  name: string
  targetAmount: number
  savedAmount: number
}
export default function Page(){
  const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>([])

  useEffect(() => {
    const fetchSavingsGoals = async () => {
      const goals = await getAllSavings();
      setSavingsGoals(goals);
    };
    fetchSavingsGoals();
  }, []);

  const handleAddGoal = async (newGoal: SavingsGoal) => {

  

    setSavingsGoals([...savingsGoals, addedGoal])
  }

  const handleUpdateSavedAmount = async (id: string, amount: number) => {
    const updatedGoal = await updateSaving(id, amount);
    setSavingsGoals(savingsGoals.map(goal => 
      goal.id === updatedGoal.id ? updatedGoal : goal
    ))
  }

  const totalSavings = savingsGoals.length > 0 ? savingsGoals.reduce((total, goal) => total + goal.savingsAmount, 0) : 0
    return <Layout>
          <Header headerName="Saving" link="/saving" linkName="Saving" />
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-8">
          <SavingsGoalForm onAddGoal={handleAddGoal} />
          <Card>
            <CardHeader>
              <CardTitle>Savings Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">${totalSavings.toFixed(2)}</div>
              <p className="text-sm text-muted-foreground mt-2">Total savings for this month</p>
            </CardContent>
          </Card>
        </div>
        <SavingsGoalProgress goals={savingsGoals} onUpdateSavedAmount={handleUpdateSavedAmount} />
      </div>
    </Layout>
}