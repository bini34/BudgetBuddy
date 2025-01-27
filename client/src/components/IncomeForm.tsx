"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { addIncome } from '@/lib/income'
interface IncomeEntry {
  id: string
  source: string
  amount: number
  month: number
  year: number
}

interface IncomeFormProps {
  onAddIncome: (income: IncomeEntry) => void
}

export function IncomeForm({ onAddIncome }: IncomeFormProps) {
  const [source, setSource] = useState('')
  const [amount, setAmount] = useState('')
  const [month, setMonth] = useState(new Date().getMonth() + 1)
  const [year, setYear] = useState(new Date().getFullYear())
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newIncome: IncomeEntry = {
      id: Date.now().toString(),
      source,
      amount: parseFloat(amount),
      month: month,
      year: year
    }
    const response = await addIncome({
        source: newIncome.source,
        amount: newIncome.amount,
        month: newIncome.month,
        year: newIncome.year
    });
    if (response.success) {
      onAddIncome(newIncome)
      toast({
        title: "Income added",
        description: `$${amount} from ${source} has been logged.`,
        variant: "success"
      })
    }
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

