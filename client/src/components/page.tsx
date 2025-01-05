"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SavingsGoalForm } from "@/components/SavingsGoalForm"
import { SavingsGoalProgress } from "@/components/SavingsGoalProgress"

interface SavingsGoal {
  id: string
  name: string
  targetAmount: number
  savedAmount: number
}

export default function MonthlySavingsGoalsPage() {
  const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>([])

  useEffect(() => {
    fetch('/api/savings')
      .then(response => response.json())
      .then(data => setSavingsGoals(data))
  }, [])

  const handleAddGoal = async (newGoal: Omit<SavingsGoal, 'id'>) => {
    const response = await fetch('/api/savings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newGoal, userId: '1' }) // Replace with actual user ID
    })
    const addedGoal = await response.json()
    setSavingsGoals([...savingsGoals, addedGoal])
  }

  const handleUpdateSavedAmount = async (id: string, amount: number) => {
    const response = await fetch('/api/savings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, savedAmount: amount })
    })
    const updatedGoal = await response.json()
    setSavingsGoals(savingsGoals.map(goal => 
      goal.id === updatedGoal.id ? updatedGoal : goal
    ))
  }

  const totalSavings = savingsGoals.reduce((sum, goal) => sum + goal.savedAmount, 0)

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Monthly Savings Goals</h1>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Savings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalSavings.toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>

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
    </div>
  )
}

