"use client"
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { getAllSavings } from '@/lib/saving'
interface SavingsGoal {
  id: string
  name: string
  targetAmount: number
  savedAmount: number
}

interface SavingsGoalProgressProps {
  goals: SavingsGoal[]
  onUpdateSavedAmount: (id: string, amount: number) => void
}

export function SavingsGoalProgress({ goals, onUpdateSavedAmount }: SavingsGoalProgressProps) {
  const [savingsGoals, setSavingsGoals] = useState(goals)

  useEffect(() => {
    setSavingsGoals(goals)
  }, [goals])

  const handleSavedAmountChange = (id: string, amount: string) => {
    const parsedAmount = parseFloat(amount)
    if (!isNaN(parsedAmount)) {
      onUpdateSavedAmount(id, parsedAmount)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Savings Goals Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {goals.length > 0 && goals.map((goal) => {
            const percentage = (goal.savedAmount / goal.targetAmount) * 100
            return (
              <div key={goal.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{goal.name}</span>
                  <span className="text-sm text-muted-foreground">
                    ${goal.savedAmount.toFixed(2)} / ${goal.targetAmount.toFixed(2)}
                  </span>
                </div>
                <Progress value={percentage} className="h-2" />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{percentage.toFixed(1)}% achieved</span>
                  <input
                    type="number"
                    value={goal.savedAmount}
                    onChange={(e) => handleSavedAmountChange(goal.id, e.target.value)}
                    className="w-24 px-2 py-1 text-sm border rounded"
                    placeholder="Update saved"
                  />
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

