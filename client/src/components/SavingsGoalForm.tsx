"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

interface SavingsGoal {
  id: string
  name: string
  targetAmount: number
  savedAmount: number
}

interface SavingsGoalFormProps {
  onAddGoal: (goal: SavingsGoal) => void
}

export function SavingsGoalForm({ onAddGoal }: SavingsGoalFormProps) {
  const [name, setName] = useState('')
  const [targetAmount, setTargetAmount] = useState('')
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newGoal: SavingsGoal = {
      id: Date.now().toString(),
      name,
      targetAmount: parseFloat(targetAmount),
      savedAmount: 0 // Initially set to 0
    }
    onAddGoal(newGoal)
    toast({
      title: "Savings Goal Added",
      description: `New goal "${name}" with target $${targetAmount} has been added.`,
    })
    setName('')
    setTargetAmount('')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Savings Goal</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="goalName">Goal Name</Label>
            <Input
              id="goalName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Emergency Fund"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="targetAmount">Target Amount</Label>
            <Input
              id="targetAmount"
              type="number"
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
              placeholder="Enter target amount"
              required
            />
          </div>
          <Button type="submit" className="w-full">Add Goal</Button>
        </form>
      </CardContent>
    </Card>
  )
}

