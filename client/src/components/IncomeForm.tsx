"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

interface IncomeEntry {
  id: string
  source: string
  amount: number
  date: string
}

interface IncomeFormProps {
  onAddIncome: (income: IncomeEntry) => void
}

export function IncomeForm({ onAddIncome }: IncomeFormProps) {
  const [source, setSource] = useState('')
  const [amount, setAmount] = useState('')
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newIncome: IncomeEntry = {
      id: Date.now().toString(),
      source,
      amount: parseFloat(amount),
      date: new Date().toISOString().split('T')[0] // Current date
    }
    onAddIncome(newIncome)
    toast({
      title: "Income added",
      description: `$${amount} from ${source} has been logged.`,
    })
    setSource('')
    setAmount('')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Log Income</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="source">Income Source</Label>
            <Input
              id="source"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              placeholder="e.g., Salary, Freelance"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              required
            />
          </div>
          <Button type="submit" className="w-full">Add Income</Button>
        </form>
      </CardContent>
    </Card>
  )
}

